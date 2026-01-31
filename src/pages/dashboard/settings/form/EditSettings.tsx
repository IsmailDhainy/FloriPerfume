import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { editSettings, getOne } from "$/api/settings/settings.api";
import Form from "$/components/form/Form";
import FormModernFileInput from "$/components/form/form-inputs/modern/FormFileInput";
import FormTextInput from "$/components/form/form-inputs/modern/FormTextInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import { SettingFormSchemaType, settingFormSchema } from "./zod.validation";

const EditSettingsPage = () => {
  const navigate = useNavigate();

  const { data: settingData, isPending } = useQuery({
    queryKey: ["get-one-settings"],
    queryFn: () => getOne(),
    refetchOnMount: true,
  });

  const { mutate, isPending: isPendingSetting } = useMutation({
    mutationKey: ["edit-settings"],
    mutationFn: ({ data }: { data: SettingFormSchemaType }) =>
      editSettings(data),
    onSuccess: () => {
      toast.success(`Settings has been successfully edited!`);
      navigate(PATHS.DASHBOARD_ROOT);
    },
  });

  if (isPendingSetting || isPending) {
    return <Loader />;
  }

  return (
    <Form<SettingFormSchemaType>
      resolverSchema={settingFormSchema}
      key={JSON.stringify(settingData)}
      onSubmit={(data) =>
        mutate({
          data,
        })
      }
      options={{
        defaultValues: {
          whatsapp: settingData?.whatsapp || "",
          facebook: settingData?.facebook || "",
          instagram: settingData?.instagram || "",
          tiktok: settingData?.tiktok || "",
          x: settingData?.x || "",
          shippingRate: settingData?.shippingRate || 0,
          email: settingData?.email || "",
          address: settingData?.address || "",
          googleLocation: settingData?.googleLocation || "",
          productBanner: settingData?.productBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.productBanner.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.productBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          categoryBanner: settingData?.categoryBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.categoryBanner.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.categoryBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          cartBanner: settingData?.cartBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.cartBanner.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.cartBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          checkoutBanner: settingData?.checkoutBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.checkoutBanner.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.checkoutBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          productDetailBanner: settingData?.productDetailBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.productDetailBanner.split("/").pop() ||
                  "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.productDetailBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          whishlistBanner: settingData?.whishlistBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.whishlistBanner.split("/").pop() ||
                  "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.whishlistBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          accountBanner: settingData?.accountBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.accountBanner.split("/").pop() || "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.accountBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
          contactUsBanner: settingData?.contactUsBanner
            ? (() => {
                const dt = new DataTransfer();
                const fileName =
                  settingData.contactUsBanner.split("/").pop() ||
                  "uploaded.png";
                const file = new File([""], fileName, { type: "image/png" });

                // @ts-expect-error: add a custom property to store the actual URL
                file.previewUrl = settingData.contactUsBanner;

                dt.items.add(file);
                return dt.files;
              })()
            : new DataTransfer().files,
        },
      }}
      className="flex max-w-4xl flex-col gap-5 rounded-lg bg-white"
    >
      <h5 className="mb-2">Info</h5>
      <FormTextInput
        label="Address"
        name="address"
        placeholder="Enter address"
      />
      <FormTextInput
        label="Email"
        name="email"
        placeholder="Enter email link"
      />
      {/* <FormTextInput
        label="Google Location"
        name="googleLocation"
        placeholder="Enter google location link"
      /> */}
      <h5 className="mb-2">Social Media</h5>
      <Flexbox className="flex-row gap-2">
        <FormTextInput
          label="Whatsapp Number"
          name="whatsapp"
          placeholder="Enter whatsapp number"
        />
        <FormTextInput
          label="Facebook Link"
          name="facebook"
          placeholder="Enter facebook link"
        />
      </Flexbox>
      <Flexbox className="flex-row gap-2">
        <FormTextInput
          label="Instagram Link"
          name="instagram"
          placeholder="Enter instagram link"
        />
        <FormTextInput
          label="Tiktok Link"
          name="tiktok"
          placeholder="Enter tiktok link"
        />
      </Flexbox>
      <Flexbox className="flex-row gap-2">
        <FormTextInput label="X Link" name="x" placeholder="Enter x link" />

        <FormTextInput
          label="Shipping Rate ($)"
          name="shippingRate"
          placeholder="Enter shipping rate"
        />
      </Flexbox>
      <h5 className="mt-4 mb-2">Banners</h5>
      <FormModernFileInput
        label="Category Banner Image"
        name="categoryBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Product Banner Image"
        name="productBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Product Detail Banner Image"
        name="productDetailBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Cart Image"
        name="cartBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Checkout Banner Image"
        name="checkoutBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Whishlist Banner Image"
        name="whishlistBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="My Account Banner Image"
        name="accountBanner"
        accept="image/*"
      />
      <FormModernFileInput
        label="Contact Us Banner Image"
        name="contactUsBanner"
        accept="image/*"
      />

      <Flexbox className="flex-row !justify-end">
        <Button
          className="w-[200px]"
          variant="primary"
          type="submit"
          isLoading={isPending}
        >
          Edit Settings
        </Button>
      </Flexbox>
    </Form>
  );
};

export default EditSettingsPage;
