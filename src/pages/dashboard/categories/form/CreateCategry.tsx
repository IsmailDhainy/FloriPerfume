import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createCategory } from "$/api/categories/category.api";
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

const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success(`Category was successfully added!`);
      navigate(PATHS.CATEGORIES);
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateCategoryFormSchemaType>
      resolverSchema={createCategoryFormSchema}
      onSubmit={(data) => mutate(data)}
      options={{
        defaultValues: {
          name: "",
          description: "",
          isActive: true,
          image: "",
          showOnHomePage: false,
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
      <Flexbox className="mt-4 flex-row !justify-end gap-1">
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
          Add Category
        </Button>
      </Flexbox>
    </Form>
  );
};

export default CreateCategoryPage;
