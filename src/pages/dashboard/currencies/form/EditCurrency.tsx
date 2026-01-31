import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editCurrency, getOne, remove } from "$/api/currencies/currencies.api";
import Form from "$/components/form/Form";
import FormSwitchInput from "$/components/form/form-inputs/modern/FormSwitchInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateCurrencyFormSchemaType,
  createCurrencyFormSchema,
} from "./zod.validation";

const EditCurrencyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: currencyData, isPending: isPendingCurrencyData } = useQuery({
    queryKey: ["get-one-currency", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-currency", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateCurrencyFormSchemaType;
    }) => editCurrency(id, data),
    onSuccess: () => {
      toast.success(`Currency has been successfully edited!`);
      navigate(PATHS.CURRENCIES);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-currency", id],
    mutationFn: () => remove(parseInt(id!, 10)),
    onSuccess: () => {
      navigate(PATHS.CURRENCIES);
      toast.success(`Currency has been successfully deleted!`);
    },
  });

  if (!currencyData || isPendingCurrencyData || isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateCurrencyFormSchemaType>
      resolverSchema={createCurrencyFormSchema}
      key={JSON.stringify(currencyData)}
      onSubmit={(data) =>
        mutate({
          id: parseInt(id!, 10),
          data,
        })
      }
      options={{
        defaultValues: {
          code: currencyData?.code || "",
          symbol: currencyData?.symbol || "",
          rate: String(currencyData?.rate) || "1",
          default: Boolean(currencyData?.default) || false,
          image: currencyData?.image
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  currencyData.image.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = currencyData.image;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
    >
      <FormTextInput
        label="Code"
        name="code"
        placeholder="Enter code"
        required
      />
      <FormTextInput
        label="Symbol"
        name="symbol"
        placeholder="Enter symbol"
        required
      />
      <FormTextInput
        label="rate"
        name="rate"
        placeholder="Enter rate"
        required
      />
      <FormSwitchInput
        label="Is Default"
        name="default"
        description="Is this currency a default?"
      />

      <Flexbox className="flex-row !justify-between">
        <Button
          className="w-[200px]"
          variant="faded"
          isLoading={isPending}
          onClick={() => deleteMutate()}
        >
          Delete Currency
        </Button>
        <Flexbox className="mt-4 flex-row !justify-end gap-2">
          <Button
            className="w-[200px]"
            variant="outlined"
            isLoading={isPending}
            onClick={() => navigate(PATHS.CURRENCIES)}
          >
            Back
          </Button>
          <Button
            className="w-[200px]"
            variant="primary"
            type="submit"
            isLoading={isPending}
          >
            Edit Currency
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

export default EditCurrencyPage;
