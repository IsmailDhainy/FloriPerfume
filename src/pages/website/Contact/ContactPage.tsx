import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createConatct } from "$/api/contacts/contacts.api";
import useSettings from "$/hooks/contexts/useSettings";
import PATHS from "$/routes/constants";
import { errorMessageToaster } from "$/utils/functions/error.functions";

const ContactPage = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const { mutate: addContact } = useMutation({
    mutationKey: ["add-contact"],
    mutationFn: createConatct,
    onSuccess: () => {
      toast.success(`Successfully sending the message`);
    },
    onError: (error: AxiosError) => errorMessageToaster(error),
  });

  const handleContactForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    addContact(
      data as { name: string; email: string; phone: string; message: string },
    );
  };

  return (
    <div id="wrapper">
      <div
        className={`page-title h-[300px] bg-cover bg-center`}
        style={{
          backgroundImage: `url('${settings?.contactUsBanner ? settings.contactUsBanner : "/images/CommonBanner.jpg"}')`,
        }}
      >
        <div className="container">
          <h3 className="heading text-center">Contact Us</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <a className="link" onClick={() => navigate(PATHS.HOME)}>
                Homepage
              </a>
            </li>
            <li>
              <i className="icon-arrRight"></i>
            </li>
            <li>
              <a className="link" onClick={() => navigate(PATHS.CONTACT)}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-us-map">
                {settings?.googleLocation && (
                  <div className="wrap-map">
                    <div
                      id="map-contact"
                      className="map-contact"
                      data-map-zoom="16"
                      data-map-scroll="true"
                    ></div>
                  </div>
                )}
                <div className="right">
                  <h4>Information</h4>
                  {settings?.whatsapp && (
                    <div className="mb_20">
                      <div className="text-title mb_8">Phone:</div>
                      <p className="text-secondary">{settings?.whatsapp}</p>
                    </div>
                  )}
                  {settings?.email && (
                    <div className="mb_20">
                      <div className="text-title mb_8">Email:</div>
                      <a
                        className="text-secondary"
                        href={`mailto:${settings?.email}`}
                      >
                        {settings?.email}
                      </a>
                    </div>
                  )}
                  {settings?.address && (
                    <div className="mb_20">
                      <div className="text-title mb_8">Address:</div>
                      <p className="text-secondary">{settings?.address}</p>
                    </div>
                  )}
                  <div>
                    <div className="text-title mb_8">Open Time:</div>
                    <p className="mb_4 open-time">
                      <span className="text-secondary">Mon - Fri:</span> 7:30am
                      - 8:00pm
                    </p>
                    <p className="open-time">
                      <span className="text-secondary">Saturday:</span> 9:00am -
                      5:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-spacing pt-0">
        <div className="container">
          <div className="heading-section text-center">
            <h3 className="heading">Get In Touch</h3>
            <p className="subheading">
              Use the form below to get in touch with the sales team
            </p>
          </div>
          <form
            id="contactform"
            onSubmit={(data) => {
              handleContactForm(data);
            }}
            className="form-leave-comment"
          >
            <div className="wrap">
              <div className="cols">
                <fieldset className="">
                  <input
                    className=""
                    type="text"
                    placeholder="Your Name*"
                    name="name"
                    id="name"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="">
                  <input
                    className=""
                    type="text"
                    placeholder="Your Phone*"
                    name="phone"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <fieldset className="">
                <input
                  className=""
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  id="email"
                  tabIndex={2}
                />
              </fieldset>
              <fieldset className="">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Your Message*"
                  tabIndex={2}
                  aria-required="true"
                  required
                ></textarea>
              </fieldset>
            </div>
            <div className="button-submit send-wrap">
              <button className="tf-btn btn-fill" type="submit">
                <span className="text text-button">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
