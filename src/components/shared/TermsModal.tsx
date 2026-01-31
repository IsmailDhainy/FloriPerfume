interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal = ({ isOpen, onClose, onAccept }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-opacity-50 absolute inset-0 bg-black backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Terms of Service & Privacy Policy
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Terms of Service
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Welcome to Speedy! By creating an account and using our
                services, you agree to comply with and be bound by these Terms
                of Service.
              </p>
              <p>
                <strong>1. Service Description:</strong> Speedy provides a
                platform for various business and government services,
                connecting users with service providers.
              </p>
              <p>
                <strong>2. User Responsibilities:</strong> You are responsible
                for maintaining the confidentiality of your account and for all
                activities under your account.
              </p>
              <p>
                <strong>3. Prohibited Activities:</strong> You may not use our
                service for any illegal activities or to violate any local,
                state, or federal laws.
              </p>
              <p>
                <strong>4. Service Availability:</strong> We strive to provide
                continuous service but do not guarantee uninterrupted
                availability.
              </p>
            </div>

            <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800">
              Privacy Policy
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Your privacy is important to us. This Privacy Policy explains
                how we collect, use, and protect your information.
              </p>
              <p>
                <strong>Information We Collect:</strong> We collect information
                you provide directly, such as your name, email, and phone
                number.
              </p>
              <p>
                <strong>How We Use Your Information:</strong> We use your
                information to provide services, communicate with you, and
                improve our platform.
              </p>
              <p>
                <strong>Data Security:</strong> We implement appropriate
                security measures to protect your personal information.
              </p>
              <p>
                <strong>Third-Party Services:</strong> We may use third-party
                services that have their own privacy policies.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
