import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllBrands } from "$/api/brands/brand.api";
import { getAllAdminCategoriesDashboard } from "$/api/categories/category.api";
import {
  editProduct,
  getOneDashboard,
  remove,
} from "$/api/products/product.api";
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
  editProductFormSchema,
} from "./zod.validation";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
    mutate({
      id: parseInt(id!, 10),
      data,
    });
  };

  const { data: productData, isPending: isPendingProductData } = useQuery({
    queryKey: ["get-one-product", id],
    queryFn: () => getOneDashboard(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-product", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateProductFormSchemaType;
    }) => editProduct(id, data),
    onSuccess: () => {
      toast.success(`Product has been successfully edited!`);
      navigate(PATHS.PRODUCTS);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-product", id],
    mutationFn: () => remove(parseInt(id!, 10)),
    onSuccess: () => {
      toast.success(`Product has been successfully deleted!`);
      navigate(PATHS.PRODUCTS);
    },
  });

  const { data: categoriesResponse, isPending: isPendingCategories } = useQuery(
    {
      queryKey: ["get-all-categories"],
      queryFn: () => getAllAdminCategoriesDashboard(),
      refetchOnMount: true,
    },
  );

  const { data: brandsResponse, isPending: isPendingBrands } = useQuery({
    queryKey: ["get-all-brands"],
    queryFn: () => getAllBrands(),
    refetchOnMount: true,
  });

  useEffect(() => {
    if (productData?.size && productData.size.length > 0) {
      const sizes = productData.size.map((_, index) => index);
      setSizeArray(sizes);
    }
  }, [productData?.size]);

  if (
    isPendingProductData ||
    isPending ||
    isPendingCategories ||
    isPendingBrands
  ) {
    return <Loader />;
  }

  const categories = categoriesResponse?.data;
  const brands = brandsResponse?.data;

  return (
    <Form<CreateProductFormSchemaType>
      resolverSchema={editProductFormSchema}
      key={JSON.stringify(productData)}
      onSubmit={(data) => submitData(data)}
      options={{
        defaultValues: {
          isActive: Boolean(productData?.isActive),
          name: productData?.name || "",
          description: productData?.description || "",
          hotSale: Boolean(productData?.hotSale),
          newArrival: Boolean(productData?.newArrival),
          bestSeller: Boolean(productData?.bestSeller),
          onSale: Boolean(productData?.onSale),
          inStock: productData?.inStock || 0,
          sku: productData?.sku || "",
          categoryId: productData?.categoryId || 0,
          size: Array.isArray(productData?.size)
            ? productData.size.map((s) =>
                typeof s === "string" ? { property: s, price: 0 } : s,
              )
            : [],
          sale: productData?.sale || 0,
          brandId: productData?.brandId || undefined,
          image:
            productData?.image && productData.image.length > 0
              ? productData.image.map((imageUrl: string) => {
                  const fileName = imageUrl.split("/").pop() || "uploaded.png";
                  const file = new File([""], fileName, { type: "image/png" });

                  // @ts-expect-error: add a custom property to store the actual URL
                  file.previewUrl = imageUrl;

                  return file;
                })
              : [],
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
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
      <div className="!mt-6 !mb-6 rounded-lg bg-white !p-4 shadow-md">
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
              key={`flexbox-size-${value}-input1-1`}
              required
            />
            <FormTextInput
              label="Price"
              name={`size.${value}.price`}
              required
              key={`flexbox-size-${value}-input1-2`}
            />
            {sizeArray.length > 1 && (
              <button
                type="button"
                className="!text-tertiary-blue flex items-center !bg-white !p-[5px]"
                onClick={() => removeSize(value)}
                key={`flexbox-size-${value}-button1-2`}
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
        options={[
          { value: 0, label: "No Brand" },
          ...(brands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
          })) || []),
        ]}
        placeholder="Select brand"
      />
      <FormModernFileInput
        label="Image"
        name="image"
        accept="image/*"
        className="!mb-4"
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
        description="Is this category active?"
      />
      <Flexbox className="!mt-4 flex-row !justify-between">
        <Button
          className="w-[200px]"
          variant="faded"
          isLoading={isPending}
          onClick={() => deleteMutate()}
        >
          Delete Product
        </Button>
        <Flexbox className="flex-row !justify-end gap-2">
          <Button
            className="w-[200px]"
            variant="outlined"
            isLoading={isPending}
            onClick={() => navigate(PATHS.PRODUCTS)}
          >
            Back
          </Button>
          <Button
            className="w-[200px]"
            variant="primary"
            type="submit"
            isLoading={isPending}
          >
            Edit Product
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

export default EditProductPage;
