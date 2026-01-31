import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "$/api/users/users.api";
import Form from "$/components/form/Form";
import FormModernPasswordInput from "$/components/form/form-inputs/FormPasswordInput";
import FormModernEmailInput from "$/components/form/form-inputs/modern/FormEmailInput";
import FormModernSelectInput from "$/components/form/form-inputs/modern/FormSelectInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateUserFormSchemaType,
  createUserFormSchema,
} from "./zod.validation";

const AddUserPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-user"],
    mutationFn: addUser,
    onSuccess: () => {
      toast.success(`User was successfully added!`);
      navigate(PATHS.USERS);
    },
  });

  return (
    <Form<CreateUserFormSchemaType>
      resolverSchema={createUserFormSchema}
      onSubmit={(data) => mutate(data)}
      options={{
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          role: "ADMIN",
          email: "",
          password: "",
        },
      }}
      className="flex !max-w-4xl flex-col !gap-5 rounded-lg bg-white"
    >
      <FormTextInput
        key="firstName"
        label="First Name"
        name="firstName"
        required
        placeholder="Enter first name"
      />
      <FormTextInput
        key="lastName"
        label="Last Name"
        name="lastName"
        required
        placeholder="Enter last name"
      />
      <FormTextInput
        key="phone"
        label="Phone"
        name="phone"
        placeholder="Enter phone"
      />

      <FormModernSelectInput
        label="Role"
        name="role"
        required
        options={[
          { value: "ADMIN", label: "Admin" },
          { value: "SUPER_ADMIN", label: "Super Admin" },
        ]}
        placeholder="Select Role"
      />
      <FormModernEmailInput
        key="email"
        label="Email"
        placeholder="Enter email"
        name="email"
        required
      />
      <FormModernPasswordInput
        key="password"
        label="password"
        name="password"
        placeholder="Enter password"
        required
      />

      <Flexbox className="flex-row !justify-end gap-1">
        <Button
          className="!w-[200px]"
          variant="outlined"
          isLoading={isPending}
          onClick={() => navigate(PATHS.USERS)}
        >
          Back
        </Button>
        <Button
          className="!w-[200px]"
          variant="primary"
          type="submit"
          isLoading={isPending}
        >
          Add User
        </Button>
      </Flexbox>
    </Form>
  );
};

export default AddUserPage;
