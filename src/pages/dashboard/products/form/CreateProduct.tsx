import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllBrands } from "$/api/brands/brand.api";
import { getAllCategories } from "$/api/categories/category.api";
import { createProduct } from "$/api/products/product.api";
import Form from "$/components/form/Form";
import FormModernFileInput from "$/components/form/form-inputs/modern/FormFileInput";
import FormNumberInput from "$/components/form/form-inputs/modern/FormNumberInput";
import FormModernSelectInput from "$/components/form/form-inputs/modern/FormSelectInput";
import FormSwitchInput from "$/components/form/form-inputs/modern/FormSwitchInput";
import FormTextAreaInput from "$/components/form/form-inputs/modern/FormTextAreaInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateProductFormSchemaType,
  createProductFormSchema,
} from "./zod.validation";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const [sizeArray, setSizeArray] = useState<number[]>([0]);

  const addSize = () => {
    setSizeArray((prev) => [...prev, prev.length]);
  };
  const removeSize = (indexToRemove: number) => {
    setSizeArray((prev) => prev.filter((i) => i !== indexToRemove));
  };

  const submitData = (data: CreateProductFormSchemaType) => {
    if (data.size) {
      data.size = data.size.filter((_, index) => sizeArray.includes(index));
    }

    // Clean up empty strings
    const cleanedData = {
      ...data,
      description: data.description?.trim() || undefined,
      sku: data.sku?.trim() || undefined,
      brandId: data.brandId === 0 ? undefined : data.brandId,
    };
    mutate(cleanedData);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success(`Product was successfully added!`);
      navigate(PATHS.PRODUCTS);
    },
  });

  const { data: categoriesResponse, isPending: isPendingCategories } = useQuery(
    {
      queryKey: ["get-all-categories"],
      queryFn: () => getAllCategories(),
      refetchOnMount: true,
    },
  );

  const { data: brandsResponse, isPending: isPendingBrands } = useQuery({
    queryKey: ["get-all-brands"],
    queryFn: () => getAllBrands(),
    refetchOnMount: true,
  });

  if (isPendingCategories || isPendingBrands) {
    return <Loader />;
  }

  const categories = categoriesResponse?.data;
  const brands = brandsResponse?.data;

  return (
    <Form<CreateProductFormSchemaType>
      resolverSchema={createProductFormSchema}
      onSubmit={(data) => submitData(data)}
      options={{
        defaultValues: {
          name: "",
          description: "",
          isActive: true,
          sale: 0,

          image: [],
          size: [],
          hotSale: false,
          newArrival: false,
          bestSeller: false,
          onSale: false,
          inStock: 0,
          categoryId: 0,
          brandId: 0,
        },
      }}
      className="flex max-w-4xl flex-col gap-[30px] rounded-lg bg-white"
    >
      <FormTextInput
        label="Name"
        name="name"
        placeholder="Enter name"
        required
      />
      <FormTextAreaInput
        label="Description"
        name="description"
        placeholder="Enter description"
      />
      <div className="!mb-6 rounded-lg bg-white !p-4 shadow-md">
        <Flexbox className="flex-row !justify-between">
          <h4 className="mb-4 font-semibold">Sizes With Price</h4>
          <button
            type="button"
            className="!text-tertiary-blue flex items-center !bg-white"
            onClick={() => addSize()}
          >
            <Plus size={16} className="mr-1" /> Add Requirement
          </button>
        </Flexbox>
        {sizeArray.map((value) => (
          <Flexbox
            className="!mb-4 flex-row !items-end !justify-between !gap-4"
            key={`flexbox-size-${value}`}
          >
            <FormTextInput
              label="Property"
              name={`size.${value}.property`}
              placeholder="100 ml"
              required
              key={`flexbox-size-${value}-input1`}
            />
            <FormTextInput
              label="Price"
              name={`size.${value}.price`}
              required
              key={`flexbox-size-${value}-input2`}
            />
            {sizeArray.length > 1 && (
              <button
                type="button"
                className="!text-tertiary-blue flex items-center !bg-white !p-[5px]"
                onClick={() => removeSize(value)}
                key={`flexbox-size-${value}-button`}
              >
                <X size={16} /> Remove
              </button>
            )}
          </Flexbox>
        ))}
      </div>
      <FormNumberInput
        label="Sale"
        name="sale"
        min={0}
        placeholder="Enter sale"
      />
      <FormNumberInput
        label="Total In Stock"
        name="inStock"
        min={0}
        placeholder="Enter total number in stock"
      />
      <FormTextInput label="SKU" name="sku" placeholder="Enter sku" />
      <FormModernSelectInput
        label="Category"
        name="categoryId"
        required
        options={
          categories?.map((category) => ({
            value: category.id,
            label: category.name,
          })) || []
        }
        placeholder="Select category"
      />
      <FormModernSelectInput
        label="Brand"
        name="brandId"
        options={
          brands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
          })) || []
        }
        placeholder="Select brand"
      />
      <FormModernFileInput
        label="Image"
        name="image"
        accept="image/*"
        multiple
      />
      <div className="grid grid-cols-2 gap-3">
        <FormSwitchInput
          label="Hot Sale"
          name="hotSale"
          description="Is this product is hot sale?"
        />
        <FormSwitchInput
          label="New Arrval"
          name="newArrival"
          description="Is this product is new arrival?"
        />
        <FormSwitchInput
          label="Best seller"
          name="bestSeller"
          description="Is this product is best seller?"
        />
        <FormSwitchInput
          label="On Sale"
          name="onSale"
          description="Is this product is on sale?"
        />
      </div>
      <FormSwitchInput
        label="Is Active"
        name="isActive"
        description="Is this product active?"
      />
      <Flexbox className="flex-row !justify-end gap-1">
        <Button
          className="w-[200px]"
          variant="outlined"
          isLoading={isPending}
          onClick={() => navigate(PATHS.CATEGORIES)}
        >
          Back
        </Button>
        <Button
          className="w-[200px]"
          variant="primary"
          type="submit"
          isLoading={isPending}
        >
          Add Product
        </Button>
      </Flexbox>
    </Form>
  );
};

export default CreateProductPage;
