import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createSlider } from "$/api/sliders/sliders.api";
import Form from "$/components/form/Form";
import FormModernFileInput from "$/components/form/form-inputs/modern/FormFileInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CreateSliderFormSchemaType,
  createSliderFormSchema,
} from "./zod.validation";

const CreateSliderPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-slider"],
    mutationFn: createSlider,
    onSuccess: () => {
      toast.success(`Slider was successfully added!`);
      navigate(PATHS.SLIDERS);
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateSliderFormSchemaType>
      resolverSchema={createSliderFormSchema}
      onSubmit={(data) => mutate(data)}
      options={{
        defaultValues: {
          title: "",
          subtitle: "",
          image: "",
        },
      }}
      className="flex max-w-4xl flex-col gap-[30px] rounded-lg bg-white"
    >
      <FormTextInput
        label="Title"
        name="title"
        placeholder="Enter title"
        required
      />
      <FormTextInput
        label="Subtitle"
        name="subtitle"
        placeholder="Enter subtitle"
        required
      />

      <FormModernFileInput label="Image" name="image" accept="image/*" />
      <Flexbox className="mt-4 flex-row !justify-end gap-1">
        <Button
          className="w-[200px]"
          variant="outlined"
          isLoading={isPending}
          onClick={() => navigate(PATHS.SLIDERS)}
        >
          Back
        </Button>
        <Button
          className="w-[200px]"
          variant="primary"
          type="submit"
          isLoading={isPending}
        >
          Add Slider
        </Button>
      </Flexbox>
    </Form>
  );
};

export default CreateSliderPage;
