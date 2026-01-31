/**
 * Range Two Price
 * Filter Products
 * Filter Sort
 * Switch Layout
 * Handle Sidebar Filter
 * Handle Dropdown Filter
 */
(function ($) {
  "use strict";

  /* Range Two Price
  -------------------------------------------------------------------------------------*/
  var rangeTwoPrice = function () {
    if ($("#price-value-range").length > 0) {
      var skipSlider = document.getElementById("price-value-range");

      // Destroy existing slider if exists
      if (skipSlider && skipSlider.noUiSlider) {
        skipSlider.noUiSlider.destroy();
      }

      var skipValues = [
        document.getElementById("price-min-value"),
        document.getElementById("price-max-value"),
      ];

      var min = parseInt(skipSlider.getAttribute("data-min"));
      var max = parseInt(skipSlider.getAttribute("data-max"));

      noUiSlider.create(skipSlider, {
        start: [min, max],
        connect: true,
        step: 1,
        range: {
          min: min,
          max: max,
        },
        format: {
          from: function (value) {
            return parseInt(value);
          },
          to: function (value) {
            return parseInt(value);
          },
        },
      });

      skipSlider.noUiSlider.on("update", function (val, e) {
        skipValues[e].innerText = val[e];
      });
    }
  };

  /* Filter Products
  -------------------------------------------------------------------------------------*/
  var filterProducts = function () {
    const priceSlider = document.getElementById("price-value-range");

    if (!priceSlider) return;

    const minPrice = parseInt(priceSlider.dataset.min);
    const maxPrice = parseInt(priceSlider.dataset.max);

    const filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      category: [],
      brand: [],
      sale: false,
    };

    priceSlider.noUiSlider.on("update", function (values) {
      filters.minPrice = parseInt(values[0]);
      filters.maxPrice = parseInt(values[1]);

      $("#price-min-value").text(filters.minPrice);
      $("#price-max-value").text(filters.maxPrice);

      applyFilters();
      updateMetaFilter();
    });

    $("body")
      .off("change", 'input[name="category"]')
      .on("change", 'input[name="category"]', function () {
        const categoryId = $(this).attr("id");
        let categoryLabel = $(this).next("label").text().trim();
        categoryLabel = categoryLabel.replace(/\s*\(\d+\)$/, "");

        if ($(this).is(":checked")) {
          filters.category = filters.category || [];
          filters.category.push({
            id: categoryId,
            label: categoryLabel,
          });
        } else {
          filters.category = filters.category.filter(
            (available) => available.id !== categoryId,
          );
        }

        applyFilters();
        updateMetaFilter();
      });

    $("body")
      .off("change", 'input[name="brand"]')
      .on("change", 'input[name="brand"]', function () {
        const brandId = $(this).attr("id");
        let brandLabel = $(this).next("label").text().trim();
        brandLabel = brandLabel.replace(/\s*\(\d+\)$/, "");

        if ($(this).is(":checked")) {
          filters.brand.push({ id: brandId, label: brandLabel });
        } else {
          filters.brand = filters.brand.filter((brand) => brand.id !== brandId);
        }
        applyFilters();
        updateMetaFilter();
      });

    $(".shop-sale-text")
      .off("click")
      .on("click", function () {
        filters.sale = !filters.sale;
        $(this).toggleClass("active", filters.sale);
        applyFilters();
        updateMetaFilter();
      });

    function updateMetaFilter() {
      const appliedFilters = $("#applied-filters");
      const metaFilterShop = $(".meta-filter-shop");
      appliedFilters.empty();

      if (filters.category && filters.category.length > 0) {
        filters.category.forEach((category) => {
          appliedFilters.append(
            `<span class="filter-tag">${category.label} <span class="remove-tag icon-close" data-filter="category" data-value="${category.id}"></span></span>`,
          );
        });
      }

      if (filters.minPrice > minPrice || filters.maxPrice < maxPrice) {
        appliedFilters.append(
          `<span class="filter-tag">$${filters.minPrice} - $${filters.maxPrice} <span class="remove-tag icon-close" data-filter="price"></span></span>`,
        );
      }

      if (filters.brand.length > 0) {
        filters.brand.forEach((brand) => {
          appliedFilters.append(
            `<span class="filter-tag">${brand.label} <span class="remove-tag icon-close" data-filter="brand" data-value="${brand.id}"></span></span>`,
          );
        });
      }

      if (filters.sale) {
        appliedFilters.append(
          `<span class="filter-tag on-sale">On Sale <span class="remove-tag icon-close" data-filter="sale"></span></span>`,
        );
      }

      const hasFiltersApplied = appliedFilters.children().length > 0;
      metaFilterShop.toggle(hasFiltersApplied);
    }

    $("#applied-filters")
      .off("click", ".remove-tag")
      .on("click", ".remove-tag", function () {
        const filterType = $(this).data("filter");
        const filterValue = $(this).data("value");

        if (filterType === "brand") {
          filters.brand = filters.brand.filter(
            (brand) => brand.id !== filterValue,
          );
          $(`input[name="brand"][id="${filterValue}"]`).prop("checked", false);
        }
        if (filterType === "category") {
          filters.category = filters.category.filter(
            (category) => category.id !== filterValue,
          );
          $(`input[name="category"][id="${filterValue}"]`).prop(
            "checked",
            false,
          );
        }
        if (filterType === "price") {
          filters.minPrice = minPrice;
          filters.maxPrice = maxPrice;
          priceSlider.noUiSlider.set([minPrice, maxPrice]);
        }
        if (filterType === "sale") {
          filters.sale = false;
          $(".shop-sale-text").removeClass("active");
        }

        applyFilters();
        updateMetaFilter();
      });

    $("#remove-all,#reset-filter")
      .off("click")
      .on("click", function () {
        filters.category = [];
        filters.brand = [];
        filters.minPrice = minPrice;
        filters.maxPrice = maxPrice;
        filters.sale = false;

        $(".shop-sale-text").removeClass("active");
        $('input[name="brand"]').prop("checked", false);
        $('input[name="category"]').prop("checked", false);
        priceSlider.noUiSlider.set([minPrice, maxPrice]);

        applyFilters();
        updateMetaFilter();
      });

    function applyFilters() {
      let visibleProductCountGrid = 0;
      let visibleProductCountList = 0;

      $(".wrapper-shop .card-product").each(function () {
        const product = $(this);
        let showProduct = true;

        const priceText = product
          .find(".current-price")
          .text()
          .replace("$", "");
        const price = parseFloat(priceText);

        if (price < filters.minPrice || price > filters.maxPrice) {
          showProduct = false;
        }

        if (filters.category && filters.category.length > 0) {
          const categoryStatus = product.data("category");
          if (
            !filters.category.some(
              (category) => category.label === categoryStatus,
            )
          ) {
            showProduct = false;
          }
        }

        if (filters.sale) {
          if (!product.find(".on-sale-wrap").length) {
            showProduct = false;
          }
        }

        if (filters.brand.length > 0) {
          const brandId = product.attr("data-brand");
          if (!filters.brand.some((brand) => brand.id === brandId)) {
            showProduct = false;
          }
        }

        product.toggle(showProduct);

        if (showProduct) {
          if (product.hasClass("grid")) {
            visibleProductCountGrid++;
          } else if (product.hasClass("style-list")) {
            visibleProductCountList++;
          }
        }
      });

      // $("#product-count-grid").html(
      //   `<span class="count">${visibleProductCountGrid}</span> Products Found`,
      // );
      // $("#product-count-list").html(
      //   `<span class="count">${visibleProductCountList}</span> Products Found`,
      // );
      updateLastVisibleItem();
    }

    function updateLastVisibleItem() {
      setTimeout(() => {
        $(".card-product.style-list").removeClass("last");
        const lastVisible = $(".card-product.style-list:visible").last();
        if (lastVisible.length > 0) {
          lastVisible.addClass("last");
        }
      }, 50);
    }
  };

  /* Filter Sort
  -------------------------------------------------------------------------------------*/
  var filterSort = function () {
    let isListActive = $(".sw-layout-list").hasClass("active");
    let originalProductsList = $("#listLayout .card-product").clone();
    let originalProductsGrid = $("#gridLayout .card-product").clone();
    let paginationList = $("#listLayout .wg-pagination").clone();
    let paginationGrid = $("#gridLayout .wg-pagination").clone();

    $(".select-item")
      .off("click")
      .on("click", function () {
        const sortValue = $(this).data("sort-value");
        $(".select-item").removeClass("active");
        $(this).addClass("active");
        $(".text-sort-value").text($(this).find(".text-value-item").text());

        applyFilter(sortValue, isListActive);
      });

    function applyFilter(sortValue, isListActive) {
      let products;

      if (isListActive) {
        products = $("#listLayout .card-product");
      } else {
        products = $("#gridLayout .card-product");
      }

      if (sortValue === "best-selling") {
        if (isListActive) {
          $("#listLayout").empty().append(originalProductsList.clone());
        } else {
          $("#gridLayout").empty().append(originalProductsGrid.clone());
        }
        bindProductEvents();
        displayPagination(products, isListActive);
        return;
      }

      if (sortValue === "price-low-high") {
        products.sort(
          (a, b) =>
            parseFloat($(a).find(".current-price").text().replace("$", "")) -
            parseFloat($(b).find(".current-price").text().replace("$", "")),
        );
      } else if (sortValue === "price-high-low") {
        products.sort(
          (a, b) =>
            parseFloat($(b).find(".current-price").text().replace("$", "")) -
            parseFloat($(a).find(".current-price").text().replace("$", "")),
        );
      } else if (sortValue === "a-z") {
        products.sort((a, b) =>
          $(a).find(".title").text().localeCompare($(b).find(".title").text()),
        );
      } else if (sortValue === "z-a") {
        products.sort((a, b) =>
          $(b).find(".title").text().localeCompare($(a).find(".title").text()),
        );
      }

      if (isListActive) {
        $("#listLayout").empty().append(products);
      } else {
        $("#gridLayout").empty().append(products);
      }
      bindProductEvents();
      displayPagination(products, isListActive);
    }

    function displayPagination(products, isListActive) {
      if (products.length >= 12) {
        if (isListActive) {
          $("#listLayout").append(paginationList.clone());
        } else {
          $("#gridLayout").append(paginationGrid.clone());
        }
      }
    }

    function bindProductEvents() {
      if ($(".card-product").length > 0) {
        $(".color-swatch")
          .off("click mouseover")
          .on("click mouseover", function () {
            var swatchColor = $(this).find("img").attr("src");
            var imgProduct = $(this)
              .closest(".card-product")
              .find(".img-product");
            imgProduct.attr("src", swatchColor);
            $(this)
              .closest(".card-product")
              .find(".color-swatch.active")
              .removeClass("active");
            $(this).addClass("active");
          });
      }
    }
    bindProductEvents();
  };

  /* Switch Layout 
  -------------------------------------------------------------------------------------*/
  // var swLayoutShop = function () {
  //   // Handle layout switch clicks
  //   $(".tf-view-layout-switch")
  //     .off("click")
  //     .on("click", function (e) {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       var $this = $(this);
  //       var value = $this.data("value-layout");

  //       // Update active state
  //       $(".tf-view-layout-switch").removeClass("active");
  //       $this.addClass("active");

  //       var $gridLayout = $("#gridLayout");
  //       var $listLayout = $("#listLayout");

  //       // Handle list vs grid
  //       if (value === "list") {
  //         $gridLayout.hide();
  //         $listLayout.show();
  //         $(".wrapper-control-shop")
  //           .addClass("listLayout-wrapper")
  //           .removeClass("gridLayout-wrapper");
  //       } else {
  //         // Handle grid and column changes (grid, tf-col-2, tf-col-3, etc.)
  //         $listLayout.hide();
  //         $gridLayout.show();

  //         // Remove all column classes
  //         $gridLayout.removeClass(
  //           "tf-col-2 tf-col-3 tf-col-4 tf-col-5 tf-col-6 tf-col-7",
  //         );

  //         // Add the new column class if specified
  //         if (value.startsWith("tf-col-")) {
  //           $gridLayout.addClass(value);
  //         } else if (value === "grid") {
  //           // Default to tf-col-4 if just "grid" is specified
  //           if (
  //             !$gridLayout.hasClass("tf-col-2") &&
  //             !$gridLayout.hasClass("tf-col-3") &&
  //             !$gridLayout.hasClass("tf-col-4") &&
  //             !$gridLayout.hasClass("tf-col-5")
  //           ) {
  //             $gridLayout.addClass("tf-col-4");
  //           }
  //         }

  //         $(".wrapper-control-shop")
  //           .addClass("gridLayout-wrapper")
  //           .removeClass("listLayout-wrapper");
  //       }
  //     });
  // };
  /* Switch Layout 
  -------------------------------------------------------------------------------------*/
  var swLayoutShop = function () {
    // Restore saved layout on initialization
    var savedLayout = localStorage.getItem("shop-layout") || "tf-col-4";

    // Apply saved layout
    var $gridLayout = $("#gridLayout");
    var $listLayout = $("#listLayout");

    if (savedLayout === "list") {
      $gridLayout.hide();
      $listLayout.show();
      $(".tf-view-layout-switch").removeClass("active");
      $(".sw-layout-list").addClass("active");
      $(".wrapper-control-shop")
        .addClass("listLayout-wrapper")
        .removeClass("gridLayout-wrapper");
    } else {
      $listLayout.hide();
      $gridLayout.show();
      $(".tf-view-layout-switch").removeClass("active");

      // Determine which column switch to activate
      var columnNum = savedLayout.split("-")[2] || "4";
      $(`.sw-layout-${columnNum}`).addClass("active");

      $gridLayout
        .removeClass("tf-col-2 tf-col-3 tf-col-4 tf-col-5")
        .addClass(savedLayout);
      $(".wrapper-control-shop")
        .addClass("gridLayout-wrapper")
        .removeClass("listLayout-wrapper");
    }

    // Handle layout switch clicks
    $(".tf-view-layout-switch")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var value = $this.data("value-layout");

        // Save layout to localStorage
        localStorage.setItem("shop-layout", value);

        // Update active state
        $(".tf-view-layout-switch").removeClass("active");
        $this.addClass("active");

        var $gridLayout = $("#gridLayout");
        var $listLayout = $("#listLayout");

        // Handle list vs grid
        if (value === "list") {
          $gridLayout.hide();
          $listLayout.show();
          $(".wrapper-control-shop")
            .addClass("listLayout-wrapper")
            .removeClass("gridLayout-wrapper");
        } else {
          $listLayout.hide();
          $gridLayout.show();

          $gridLayout.removeClass(
            "tf-col-2 tf-col-3 tf-col-4 tf-col-5 tf-col-6 tf-col-7",
          );

          if (value.startsWith("tf-col-")) {
            $gridLayout.addClass(value);
          } else if (value === "grid") {
            if (
              !$gridLayout.hasClass("tf-col-2") &&
              !$gridLayout.hasClass("tf-col-3") &&
              !$gridLayout.hasClass("tf-col-4") &&
              !$gridLayout.hasClass("tf-col-5")
            ) {
              $gridLayout.addClass("tf-col-4");
            }
          }

          $(".wrapper-control-shop")
            .addClass("gridLayout-wrapper")
            .removeClass("listLayout-wrapper");
        }
      });
  };
  /* Handle Sidebar Filter 
  -------------------------------------------------------------------------------------*/
  var handleSidebarFilter = function () {
    $(".filterShop")
      .off("click")
      .on("click", function () {
        if ($(window).width() <= 1200) {
          $(".sidebar-filter,.overlay-filter").addClass("show");
        }
      });

    $(".close-filter, .overlay-filter")
      .off("click")
      .on("click", function () {
        $(".sidebar-filter,.overlay-filter").removeClass("show");
      });
  };

  /* Handle Dropdown Filter 
  -------------------------------------------------------------------------------------*/
  var handleDropdownFilter = function () {
    if ($(".wrapper-filter-dropdown").length > 0) {
      $(".filterDropdown")
        .off("click")
        .on("click", function (event) {
          event.stopPropagation();
          $(".dropdown-filter").toggleClass("show");
          $(this).toggleClass("active");
          var icon = $(this).find(".icon");
          if ($(this).hasClass("active")) {
            icon.removeClass("icon-filter").addClass("icon-close");
          } else {
            icon.removeClass("icon-close").addClass("icon-filter");
          }
          if ($(window).width() <= 1200) {
            $(".overlay-filter").addClass("show");
          }
        });

      $(document)
        .off("click.filterDropdown")
        .on("click.filterDropdown", function (event) {
          if (!$(event.target).closest(".wrapper-filter-dropdown").length) {
            $(".dropdown-filter").removeClass("show");
            $(".filterDropdown").removeClass("active");
            $(".filterDropdown .icon")
              .removeClass("icon-close")
              .addClass("icon-filter");
          }
        });

      $(".close-filter, .overlay-filter")
        .off("click")
        .on("click", function () {
          $(".dropdown-filter").removeClass("show");
          $(".filterDropdown").removeClass("active");
          $(".filterDropdown .icon")
            .removeClass("icon-close")
            .addClass("icon-filter");
          $(".overlay-filter").removeClass("show");
        });
    }
  };

  // Export initialization and cleanup functions for React
  window.shopFunctions = {
    init: function () {
      // Cleanup first to prevent duplicates
      this.cleanup();

      // Set initial layout state
      $("#gridLayout").show();
      $("#listLayout").hide();

      // Initialize all functions
      rangeTwoPrice();
      filterProducts();
      filterSort();
      swLayoutShop();
      handleSidebarFilter();
      handleDropdownFilter();
    },

    cleanup: function () {
      // Destroy noUiSlider
      const priceSlider = document.getElementById("price-value-range");
      if (priceSlider && priceSlider.noUiSlider) {
        priceSlider.noUiSlider.destroy();
      }

      // Remove all jQuery event handlers
      if (window.jQuery) {
        // Layout switching
        jQuery(".tf-view-layout-switch").off("click");

        // Filters
        jQuery("body").off("change", 'input[name="category"]');
        jQuery("body").off("change", 'input[name="brand"]');
        jQuery(".shop-sale-text").off("click");
        jQuery("#applied-filters").off("click");
        jQuery("#remove-all, #reset-filter").off("click");

        // Sort
        jQuery(".select-item").off("click");

        // Sidebar and dropdown
        jQuery(".filterShop").off("click");
        jQuery(".close-filter, .overlay-filter").off("click");
        jQuery(".filterDropdown").off("click");

        // Document events
        jQuery(document).off("click.filterDropdown");
        jQuery(window).off("resize");

        // Color swatches
        jQuery(".color-swatch").off("click mouseover");
      }
    },
  };

  // Auto-initialize only if NOT in a React app
  if (!document.getElementById("root")) {
    $(function () {
      rangeTwoPrice();
      filterProducts();
      filterSort();
      swLayoutShop();
      handleSidebarFilter();
      handleDropdownFilter();
    });
  }
})(jQuery);
