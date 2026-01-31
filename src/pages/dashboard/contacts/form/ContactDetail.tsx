import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getOne } from "$/api/contacts/contacts.api";
import Form from "$/components/form/Form";
import FormModernTextareaInput from "$/components/form/form-inputs/modern/FormTextAreaInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateContactFormSchemaType,
  createContactFormSchema,
} from "./zod.validation";

const EditContactPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: contactData, isPending: isPendingContactData } = useQuery({
    queryKey: ["get-one-contact", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  if (!contactData || isPendingContactData) {
    return <div> no data is found</div>;
  }

  return (
    <Form<CreateContactFormSchemaType>
      resolverSchema={createContactFormSchema}
      key={JSON.stringify(contactData)}
      onSubmit={() => console.log("")}
      options={{
        defaultValues: {
          name: contactData?.name || "",
          email: contactData?.email || "",
          message: contactData?.message || "",
          phone: contactData?.phone || "",
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
    >
      <FormTextInput isReadOnly={true} label="Name" name="name" />
      <FormTextInput isReadOnly={true} label="Email" name="email" />
      <FormTextInput isReadOnly={true} label="Phone" name="phone" />
      <FormModernTextareaInput
        isReadOnly={true}
        label="Message"
        name="message"
      />
      <Flexbox className="flex-row !justify-end gap-2">
        <Button
          className="w-[200px]"
          variant="outlined"
          isLoading={isPendingContactData}
          onClick={() => navigate(PATHS.CONTACT)}
        >
          Back
        </Button>
      </Flexbox>
    </Form>
  );
};

export default EditContactPage;
