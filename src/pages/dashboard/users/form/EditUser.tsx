import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editUser, getOneUser } from "$/api/users/users.api";
import Form from "$/components/form/Form";
import FormModernSelectInput from "$/components/form/form-inputs/modern/FormSelectInput";
import FormSwitchInput from "$/components/form/form-inputs/modern/FormSwitchInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";
import { EditUser } from "$/types/native/user.types";

import { EditUserFormSchemaType, editUserFormSchema } from "./zod.validation";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: userData, isPending: isPendingUser } = useQuery({
    queryKey: ["get-one-user-only", id],
    queryFn: () => getOneUser(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-user", id],
    mutationFn: ({ id, data }: { id: string; data: EditUser }) =>
      editUser(id, data),
    onSuccess: () => {
      toast.success(`User has been successfully edited!`);
      navigate(PATHS.USERS);
    },
  });

  if (!userData || isPending || isPendingUser) {
    return <div> no data is found</div>;
  }
  if (userData.role === "CLIENT") {
    return <div>This user cannot be edited.</div>;
  }

  return (
    <Form<EditUserFormSchemaType>
      resolverSchema={editUserFormSchema}
      onSubmit={(data) => mutate({ id: id!, data })}
      key={JSON.stringify(userData)}
      options={{
        defaultValues: {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phone: userData.phone || "",
          role: userData.role || "ADMIN",
          isActive: userData.isActive || false,
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
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
      <FormSwitchInput
        label="Is Active"
        name="isActive"
        description="Is this user active?"
      />

      <Flexbox className="flex-row !justify-end gap-1">
        <Button
          className="w-[200px]"
          variant="outlined"
          isLoading={isPending}
          onClick={() => navigate(PATHS.USERS)}
        >
          Back
        </Button>
        <Button
          className="w-[200px]"
          variant="primary"
          type="submit"
          isLoading={isPending}
        >
          Edit User
        </Button>
      </Flexbox>
    </Form>
  );
};

export default EditUserPage;
