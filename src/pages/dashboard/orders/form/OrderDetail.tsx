import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { editStatus, getOneById } from "$/api/checkout/checkout.api";
import Form from "$/components/form/Form";
import FormModernSelectInput from "$/components/form/form-inputs/modern/FormSelectInput";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import PATHS from "$/routes/constants";

import {
  CheckoutStatusFormSchemaType,
  checkoutStatusFormSchema,
} from "./zod.validation";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
      DELIVERED: "bg-blue-50 !text-blue-700 border !border-blue-200",
      CHECKEDOUT: "bg-green-50 !text-green-700 border !border-green-200",
      CANCELLED: "bg-red-50 !text-red-700 border !border-red-200",

      PENDING: "bg-blue-50 !text-blue-700 border !border-blue-200",
      NOTPAID: "bg-orange-50 !text-orange-700 border !border-orange-200",
      PAID: "bg-green-50 !text-green-700 border !border-green-200",
      REFUND: "bg-red-50 !text-red-700 border !border-red-200",
    };
    return (
      statusColors[status] || "bg-gray-50 text-gray-700 border border-gray-200"
    );
  };

  const { data: orderData, isPending } = useQuery({
    queryKey: ["get-one-order", id],
    queryFn: () => getOneById(id ? parseInt(id, 10) : 0),
    enabled: !!id,
    refetchOnMount: true,
  });

  const { mutate, isPending: isEditPending } = useMutation({
    mutationKey: ["edit-order", id],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CheckoutStatusFormSchemaType;
    }) => editStatus(id, data),
    onSuccess: () => {
      toast.success(`Product has been successfully edited!`);
      navigate(PATHS.ORDERS);
    },
  });

  if (isPending || isEditPending) {
    return <Loader />;
  }

  return (
    <div className="p-4 font-sans leading-relaxed text-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-2xl font-bold text-gray-700">
          Order Details: # {orderData?.id}
        </h2>
      </div>
      <div className="mt-4 mb-4 flex items-center justify-between">
        <h5>
          Status:{" "}
          <span
            className={`min-w-40 rounded-full rounded-md border border-[2px] p-1.5 px-4 py-2 text-center capitalize lowercase uppercase ${getStatusColor(orderData?.status ?? "")}`}
          >
            {orderData?.status}
          </span>
        </h5>
        <h5>
          Payment Status:{" "}
          <span
            className={`min-w-40 rounded-full rounded-md border border-[2px] p-1.5 px-4 py-2 text-center capitalize lowercase uppercase ${getStatusColor(orderData?.paymentStatus ?? "")}`}
          >
            {orderData?.paymentStatus}
          </span>
        </h5>
      </div>
      <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="m-0 text-xl font-semibold text-gray-600">
            Client Information
          </h4>
          <div>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">First Name:</strong>{" "}
              {orderData?.firstName}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Last Name:</strong>{" "}
              {orderData?.lastName}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Email:</strong>{" "}
              {orderData?.email}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Phone:</strong>{" "}
              {orderData?.phone}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="m-0 text-xl font-semibold text-gray-600">
            Location Information
          </h4>
          <div>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">City:</strong>{" "}
              {orderData?.location?.city}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Street:</strong>{" "}
              {orderData?.location?.street}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Building:</strong>{" "}
              {orderData?.location?.building}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Notes :</strong>{" "}
              {orderData?.location?.notes}
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="m-0 text-xl font-semibold text-gray-600">
            Financial Information
          </h4>
          <div>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Subtotal:</strong>{" "}
              {(orderData?.subTotal ?? 0) * (orderData?.rate ?? 1)}{" "}
              {orderData?.currency}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Discount:</strong>{" "}
              {(orderData?.discount ?? 0) * (orderData?.rate ?? 1)}{" "}
              {orderData?.currency}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Delivery:</strong>{" "}
              {(orderData?.delivery ?? 0) * (orderData?.rate ?? 1)}{" "}
              {orderData?.currency}
            </p>
            <p className="my-2">
              <strong className="mr-2 text-gray-700">Total:</strong>{" "}
              {(orderData?.total ?? 0) * (orderData?.rate ?? 1)}{" "}
              {orderData?.currency}
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="m-0 text-xl font-semibold text-gray-600">
            Cart Details
          </h4>
          {orderData?.cart.map((item, index) => (
            <div className="!mt-2 flex" key={`${index}-div33344-item`}>
              <div className="w-24" key={`${index}-div33344-item-div2`}>
                <img
                  key={`${index}-div33344-item-img`}
                  src={`${item?.image && item?.image.length > 0 ? item.image[0] : "/images/Product.jpg"}`}
                  alt="image-product"
                />
              </div>
              <div className="!ml-4" key={`${index}-div33344-item-div2`}>
                <p key={`${index}-div33344-item-pp`}>
                  <b>Name: </b>
                  {item.name}
                </p>
                <div key={`${index}-div33344-item-div5`} className="!mt-4">
                  {item.selectedSize.map((size, sizeIndex) => (
                    <div
                      key={`${sizeIndex}-div333-item`}
                      className="flex !gap-5"
                    >
                      <p key={`${sizeIndex}-div333-item-p1`}>
                        <b>Property:</b> {size.property}{" "}
                      </p>
                      <p key={`${sizeIndex}-div333-item-p1`}>
                        <b>Price:</b> {size.price * (orderData.rate ?? 1)}{" "}
                        {orderData.currency}{" "}
                      </p>
                      <p key={`${sizeIndex}-div333-item-p2`}>
                        <b>Sale:</b> {item.sale ?? 0}%{" "}
                      </p>
                      <p key={`${sizeIndex}-div333-item-p3`}>
                        <b>Quantity:</b> {size.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form<CheckoutStatusFormSchemaType>
        resolverSchema={checkoutStatusFormSchema}
        onSubmit={(data) => mutate({ id: id ? parseInt(id, 10) : 0, data })}
        options={{
          defaultValues: {
            status: orderData?.status
              ? (orderData.status as "DELIVERED" | "CANCELLED" | "CHECKEDOUT")
              : undefined,
            paymentStatus: orderData?.paymentStatus
              ? (orderData.paymentStatus as
                  | "PENDING"
                  | "PAID"
                  | "NOTPAID"
                  | "REFUND")
              : undefined,
          },
        }}
        className="flex flex-col gap-5 rounded-lg bg-white"
      >
        <Flexbox className="mt-4 flex-row gap-2">
          <FormModernSelectInput
            label="Status"
            name="status"
            required
            options={[
              { value: "DELIVERED", label: "Delivered" },
              { value: "CANCELLED", label: "Cancelled" },
              { value: "CHECKEDOUT", label: "Checked Out" },
            ]}
            placeholder="Select status"
          />
          <FormModernSelectInput
            label="Payment Status"
            name="paymentStatus"
            required
            options={[
              { value: "PENDING", label: "Pending" },
              { value: "PAID", label: "Paid" },
              { value: "NOTPAID", label: "Not Paid" },
              { value: "REFUND", label: "Refund" },
            ]}
            placeholder="Select payment status"
          />
        </Flexbox>
        <Flexbox className="mt-4 flex-row !justify-end gap-1">
          <Button
            className="w-[200px]"
            variant="outlined"
            isLoading={isPending}
            onClick={() => navigate(PATHS.ORDERS)}
          >
            Back
          </Button>
          <Button
            className="w-[200px]"
            variant="primary"
            type="submit"
            isLoading={isPending}
          >
            Update Status
          </Button>
        </Flexbox>
      </Form>
    </div>
  );
};

export default OrderDetail;
