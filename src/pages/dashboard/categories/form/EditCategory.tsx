import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editCategory, getOne, remove } from "$/api/categories/category.api";
import Form from "$/components/form/Form";
import FormModernFileInput from "$/components/form/form-inputs/modern/FormFileInput";
import FormSwitchInput from "$/components/form/form-inputs/modern/FormSwitchInput";
import FormTextAreaInput from "$/components/form/form-inputs/modern/FormTextAreaInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateCategoryFormSchemaType,
  createCategoryFormSchema,
} from "./zod.validation";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: categoryData, isPending: isPendingCategoryData } = useQuery({
    queryKey: ["get-one-category", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-category", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateCategoryFormSchemaType;
    }) => editCategory(id, data),
    onSuccess: () => {
      toast.success(`Category has been successfully edited!`);
      navigate(PATHS.CATEGORIES);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-category", id],
    mutationFn: () => remove(parseInt(id!, 10)),
    onSuccess: () => {
      toast.success(`Category has been successfully deleted!`);
      navigate(PATHS.CATEGORIES);
    },
  });

  if (isPendingCategoryData || isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateCategoryFormSchemaType>
      resolverSchema={createCategoryFormSchema}
      key={JSON.stringify(categoryData)}
      onSubmit={(data) =>
        mutate({
          id: parseInt(id!, 10),
          data,
        })
      }
      options={{
        defaultValues: {
          isActive: Boolean(categoryData?.isActive),
          name: categoryData?.name || "",
          description: categoryData?.description || "",
          showOnHomePage: Boolean(categoryData?.showOnHomePage) || false,
          image: categoryData?.image
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  categoryData.image.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = categoryData.image;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
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
      <FormModernFileInput label="Image" name="image" accept="image/*" />
      <Flexbox className="flex-row !justify-end gap-2">
        <FormSwitchInput
          label="Is Active"
          name="isActive"
          description="Is this category active?"
        />
        <Flexbox className="flex-row !justify-end">
          <FormSwitchInput
            label="Show"
            name="showOnHomePage"
            description="Is this category being shown on home page?"
          />
        </Flexbox>
      </Flexbox>
      <Flexbox className="mt-4 flex-row !justify-between">
        <Button
          className="w-[200px]"
          variant="faded"
          isLoading={isPending}
          onClick={() => deleteMutate()}
        >
          Delete Category
        </Button>
        <Flexbox className="flex-row !justify-end gap-2">
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
            Edit Category
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

export default EditCategoryPage;
