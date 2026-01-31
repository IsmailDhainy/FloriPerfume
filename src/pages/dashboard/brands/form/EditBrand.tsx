import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editBrand, getOne, remove } from "$/api/brands/brand.api";
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

const EditBrandPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: brandData, isPending: isPendingBrandData } = useQuery({
    queryKey: ["get-one-brand", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-brand", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateBrandFormSchemaType;
    }) => editBrand(id, data),
    onSuccess: () => {
      toast.success(`Brand has been successfully edited!`);
      navigate(PATHS.BRANDS);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-brand", id],
    mutationFn: () => remove(parseInt(id!, 10)),
    onSuccess: () => {
      toast.success(`Brand has been successfully deleted!`);
      navigate(PATHS.BRANDS);
    },
  });

  if (isPendingBrandData || isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateBrandFormSchemaType>
      resolverSchema={createBrandFormSchema}
      key={JSON.stringify(brandData)}
      onSubmit={(data) =>
        mutate({
          id: parseInt(id!, 10),
          data,
        })
      }
      options={{
        defaultValues: {
          isActive: Boolean(brandData?.isActive),
          name: brandData?.name || "",
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
      <FormSwitchInput
        label="Is Active"
        name="isActive"
        description="Is this brand active?"
      />
      <Flexbox className="mt-4 flex-row !justify-between">
        <Button
          className="w-[200px]"
          variant="faded"
          isLoading={isPending}
          onClick={() => deleteMutate()}
        >
          Delete Brand
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
            Edit Brand
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

export default EditBrandPage;
