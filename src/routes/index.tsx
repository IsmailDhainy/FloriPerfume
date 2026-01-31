import { Navigate, useRoutes } from "react-router-dom";

// dashboard
import PageLayoutComponent from "$/components/shared/page-header/PageLayoutComponent";
import DesignedWebsiteLayout from "$/layouts/DesignedWebsiteLayout";
import BrandAdd from "$/pages/dashboard/brands/form/CreateBrand";
import BrandEdit from "$/pages/dashboard/brands/form/EditBrand";
import BrandsTableProvider from "$/pages/dashboard/brands/table/BrandsTableProvider";
// website
import CreateCategoryPage from "$/pages/dashboard/categories/form/CreateCategry";
import EditCategoryPage from "$/pages/dashboard/categories/form/EditCategory";
import CategoriesTableProvider from "$/pages/dashboard/categories/table/CategoriesTableProvider";
import ClientsTableProvider from "$/pages/dashboard/clients/table/ClientTableProvider";
import ContactDetailPage from "$/pages/dashboard/contacts/form/ContactDetail";
import ContactTableProvider from "$/pages/dashboard/contacts/table/ContactTableProvider";
import CreateCurrencyPage from "$/pages/dashboard/currencies/form/CreateCurrency";
import EditCurrencyPage from "$/pages/dashboard/currencies/form/EditCurrency";
import CurrenciesTableProvider from "$/pages/dashboard/currencies/table/CurrenciesTableProvider";
import OrderDetail from "$/pages/dashboard/orders/form/OrderDetail";
import OrdersTableProvider from "$/pages/dashboard/orders/table/OrdersTableProvider";
import ProductAdd from "$/pages/dashboard/products/form/CreateProduct";
import ProductEdit from "$/pages/dashboard/products/form/EditProduct";
import ProductTableProvider from "$/pages/dashboard/products/table/ProductsTableProvider";
import EditSettingsPage from "$/pages/dashboard/settings/form/EditSettings";
import SliderCreate from "$/pages/dashboard/sliders/form/CreateSlider";
import SliderEdit from "$/pages/dashboard/sliders/form/EditSlider";
import SlidersTableProvider from "$/pages/dashboard/sliders/table/SlidersTableProvider";
import UsersTableProvider from "$/pages/dashboard/users/UsersTableProvider";
import AddUser from "$/pages/dashboard/users/form/AddUser";
import EditUser from "$/pages/dashboard/users/form/EditUser";
import MyAccountPage from "$/pages/website/Account";
import MyAddressPage from "$/pages/website/Address";
import AllCategories from "$/pages/website/AllCategories";
import AllProducts from "$/pages/website/AllProducts";
import Cart from "$/pages/website/Cart";
import Checkout from "$/pages/website/Checkout";
import ContactPage from "$/pages/website/Contact";
import ClientLoginPage from "$/pages/website/LoginWebsite";
import NotFoundPage from "$/pages/website/NotFound";
import OrderDetailPage from "$/pages/website/OrderDetail";
import MyOrdersPage from "$/pages/website/Orders";
import PrivacyPolicyPage from "$/pages/website/PrivacyPolicy";
import ProductDetail from "$/pages/website/ProductDetail";
import ClientRegisterPage from "$/pages/website/RegisterWebsite";
import TermsAndConditionPage from "$/pages/website/TermsAndCondition";
import WhishlistPage from "$/pages/website/Whislist";
import HomePage from "$/pages/website/home";

import { UserRole } from "../enums/auth";
import useAuth from "../hooks/contexts/useAuth";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import PATHS from "./constants";

const Routes = () => {
  const { user, role } = useAuth();
  const getRedirectPath = (role: UserRole | null) => {
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return PATHS.DASHBOARD_ROOT;
    } else if (role === "CLIENT") {
      return PATHS.MYACCOUNT;
    }
    return PATHS.CLIENTLOGIN;
  };
  return useRoutes([
    {
      path: PATHS.DASHBOARD_ROOT,
      element: (
        <ProtectedRoute allowed={["ADMIN", "SUPER_ADMIN"]}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <PageLayoutComponent pageTitle="Home screen">
              {/* <CarouselExample /> */}
            </PageLayoutComponent>
          ),
        },
        {
          index: true,
          path: PATHS.USERS,
          element: (
            <PageLayoutComponent pageTitle="Users">
              <UsersTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_USER_FORM,
          element: (
            <PageLayoutComponent pageTitle="Add User">
              <AddUser />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.EdIT_USER_FORM,
          element: (
            <PageLayoutComponent pageTitle="Edit User">
              <EditUser />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CATEGORIES,
          element: (
            <PageLayoutComponent pageTitle="Categories">
              <CategoriesTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_CATEGORY_FORM,
          element: (
            <PageLayoutComponent pageTitle="Add Category">
              <CreateCategoryPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CATEGORY_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Edit Category">
              <EditCategoryPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CURRENCIES,
          element: (
            <PageLayoutComponent pageTitle="Currencies">
              <CurrenciesTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_CURRENCY,
          element: (
            <PageLayoutComponent pageTitle="Add Currency">
              <CreateCurrencyPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CURRENCY_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Edit Currency">
              <EditCurrencyPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.SLIDERS,
          element: (
            <PageLayoutComponent pageTitle="Sliders">
              <SlidersTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_SLIDER,
          element: (
            <PageLayoutComponent pageTitle="Add Slider">
              <SliderCreate />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.SLIDER_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Edit Slider">
              <SliderEdit />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CONTACT,
          element: (
            <PageLayoutComponent pageTitle="Contact">
              <ContactTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CONTACT_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Contact Details">
              <ContactDetailPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.PRODUCT_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Product Details">
              <ProductEdit />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.PRODUCTS,
          element: (
            <PageLayoutComponent pageTitle="Products">
              <ProductTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_PRODUCT,
          element: (
            <PageLayoutComponent pageTitle="Add Product">
              <ProductAdd />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.BRAND_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Brand Details">
              <BrandEdit />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.BRANDS,
          element: (
            <PageLayoutComponent pageTitle="Brands">
              <BrandsTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CREATE_BRAND,
          element: (
            <PageLayoutComponent pageTitle="Add Brand">
              <BrandAdd />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.ORDERS,
          element: (
            <PageLayoutComponent pageTitle="Orders">
              <OrdersTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.ORDER_DETAILS,
          element: (
            <PageLayoutComponent pageTitle="Order Detail">
              <OrderDetail />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.EDIT_SETTINGS,
          element: (
            <PageLayoutComponent pageTitle="Edit Settings">
              <EditSettingsPage />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CLIENTS,
          element: (
            <PageLayoutComponent pageTitle="Clients">
              <ClientsTableProvider />
            </PageLayoutComponent>
          ),
        },
        {
          path: PATHS.CLIENTS_ORDERS,
          element: (
            <PageLayoutComponent pageTitle="Clients Orders">
              <OrdersTableProvider />
            </PageLayoutComponent>
          ),
        },
      ],
    },
    {
      path: PATHS.HOME,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: PATHS.ALLPRODUCTS,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <AllProducts />,
        },
      ],
    },
    {
      path: PATHS.WHISLIST,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <WhishlistPage />,
        },
      ],
    },
    {
      path: PATHS.CLIENTLOGIN,
      element: !user ? (
        <DesignedWebsiteLayout />
      ) : (
        <Navigate to={getRedirectPath(role)} />
      ),
      children: [
        {
          index: true,
          element: <ClientLoginPage />,
        },
      ],
    },
    {
      path: PATHS.CLIENTREGISTER,
      element: !user ? (
        <DesignedWebsiteLayout />
      ) : (
        <Navigate to={getRedirectPath(role)} />
      ),
      children: [
        {
          index: true,
          element: <ClientRegisterPage />,
        },
      ],
    },
    {
      path: PATHS.CART,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <Cart />,
        },
      ],
    },
    {
      path: PATHS.ALLCATEGORIES,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <AllCategories />,
        },
      ],
    },
    {
      path: PATHS.CHECKOUT,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <Checkout />,
        },
      ],
    },
    {
      path: PATHS.PRODUCTDETAIL,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: PATHS.TERMSANDCONDITION,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <TermsAndConditionPage />,
        },
      ],
    },
    {
      path: PATHS.PRIVACYPOLICY,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <PrivacyPolicyPage />,
        },
      ],
    },
    {
      path: PATHS.MYACCOUNT,
      element: (
        <ProtectedRoute allowed={["CLIENT"]}>
          <DesignedWebsiteLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <MyAccountPage />,
        },
      ],
    },
    {
      path: PATHS.ORDERDETAIL,
      element: (
        <ProtectedRoute allowed={["CLIENT"]}>
          <DesignedWebsiteLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <OrderDetailPage />,
        },
      ],
    },
    {
      path: PATHS.MYORDER,
      element: (
        <ProtectedRoute allowed={["CLIENT"]}>
          <DesignedWebsiteLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <MyOrdersPage />,
        },
      ],
    },
    {
      path: PATHS.MYADDRESS,
      element: (
        <ProtectedRoute allowed={["CLIENT"]}>
          <DesignedWebsiteLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <MyAddressPage />,
        },
      ],
    },
    {
      path: PATHS.CONTACTFORM,
      element: <DesignedWebsiteLayout />,
      children: [
        {
          index: true,
          element: <ContactPage />,
        },
      ],
    },
    {
      path: "*",
      element: <DesignedWebsiteLayout />,
      children: [
        {
          path: "*", // Change from index: true
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};

export default Routes;
