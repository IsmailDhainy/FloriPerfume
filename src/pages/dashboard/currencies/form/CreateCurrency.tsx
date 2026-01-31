import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createCurrency } from "$/api/currencies/currencies.api";
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

const CreateCurrencyPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-currency"],
    mutationFn: createCurrency,
    onSuccess: () => {
      toast.success(`Currency was successfully added!`);
      navigate(PATHS.CURRENCIES);
    },
  });
  if (isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateCurrencyFormSchemaType>
      resolverSchema={createCurrencyFormSchema}
      onSubmit={(data) => mutate(data)}
      options={{
        defaultValues: {
          code: "",
          symbol: "",
          rate: "1",
          default: false,
          image: "",
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

      <Flexbox className="mt-4 flex-row !justify-end gap-1">
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
          Add Currency
        </Button>
      </Flexbox>
    </Form>
  );
};

export default CreateCurrencyPage;
