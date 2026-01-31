import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createBrand } from "$/api/brands/brand.api";
import Form from "$/components/form/Form";
import FormSwitchInput from "$/components/form/form-inputs/modern/FormSwitchInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateBrandFormSchemaType,
  createBrandFormSchema,
} from "./zod.validation";

const CreateBrandPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-brand"],
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success(`Brand was successfully added!`);
      navigate(PATHS.BRANDS);
    },
  });
  return (
    <Form<CreateBrandFormSchemaType>
      resolverSchema={createBrandFormSchema}
      onSubmit={(data) => mutate(data)}
      options={{
        defaultValues: {
          name: "",
          isActive: true,
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
      <FormSwitchInput
        label="Is Active"
        name="isActive"
        description="Is this brand active?"
      />
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
          Add Brand
        </Button>
      </Flexbox>
    </Form>
  );
};

export default CreateBrandPage;
