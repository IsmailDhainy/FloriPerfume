import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editSlider, getOne, remove } from "$/api/sliders/sliders.api";
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

const EditSliderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: sliderData, isPending: isPendingSliderData } = useQuery({
    queryKey: ["get-one-slider", id],
    queryFn: () => getOne(parseInt(id!, 10)),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-slider", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateSliderFormSchemaType;
    }) => editSlider(id, data),
    onSuccess: () => {
      toast.success(`Slider has been successfully edited!`);
      navigate(PATHS.SLIDERS);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-slider", id],
    mutationFn: () => remove(parseInt(id!, 10)),
    onSuccess: () => {
      toast.success(`Slider has been successfully deleted!`);
      navigate(PATHS.CATEGORIES);
    },
  });

  if (isPendingSliderData || isPending) {
    return <Loader />;
  }

  return (
    <Form<CreateSliderFormSchemaType>
      resolverSchema={createSliderFormSchema}
      key={JSON.stringify(sliderData)}
      onSubmit={(data) =>
        mutate({
          id: parseInt(id!, 10),
          data,
        })
      }
      options={{
        defaultValues: {
          title: sliderData?.title || "",
          subtitle: sliderData?.subtitle || "",
          image: sliderData?.image
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  sliderData.image.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = sliderData.image;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
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
      <Flexbox className="mt-4 flex-row !justify-between">
        <Button
          className="w-[200px]"
          variant="faded"
          isLoading={isPending}
          onClick={() => deleteMutate()}
        >
          Delete Slider
        </Button>
        <Flexbox className="flex-row !justify-end gap-2">
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
            Edit Slider
          </Button>
        </Flexbox>
      </Flexbox>
    </Form>
  );
};

export default EditSliderPage;
