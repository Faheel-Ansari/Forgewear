import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { DynamicField, AddMoreFieldBtn, StaticField } from "../../index";
import api from "../../api/axios";
import { productSchema } from "../../schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, X } from "lucide-react";

function AddEditProduct() {
  const navigate = useNavigate();
  const { category, mode, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    if (mode === "edit") {
      const res = await api.get(`/admin/product/${category}/${id}`);
      if (res.data) {
        const editData = res.data.data;
        reset({
          isNew: JSON.parse(editData.isNew),
          category: category,
          oldPrice: JSON.parse(editData.oldPrice),
          newPrice: editData.newPrice,
          title: editData.title,
          desc: editData.desc,
          tags: JSON.parse(editData.tags),
          sizes: JSON.parse(editData.sizes),
          colors: JSON.parse(editData.colors),
        });
      }
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id, category]);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    context: mode,
    defaultValues: {
      isNew: true,
      category: category,
      oldPrice: null,
      newPrice: null,
      title: "",
      desc: "",
      tags: [{ value: "" }],
      sizes: [{ value: "" }],
      colors: [{ value: "" }],
    },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: "colors" });

  const onSubmit = async (data) => {
    setIsLoading(true);

    data.colors.map((e) => {
      if (!e.value.startsWith("#")) {
        e.value = "#" + e.value;
      }
    });

    const slug = data.title.toLowerCase().split(" ").join("-");

    const formData = new FormData();

    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("slug", slug);
    formData.append("desc", data.desc);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    formData.append("isNew", JSON.stringify(data.isNew));

    formData.append("colors", JSON.stringify(data.colors));
    formData.append("sizes", JSON.stringify(data.sizes));
    formData.append("tags", JSON.stringify(data.tags));

    Object.keys(data).forEach((key) => {
      if (key.includes("image") && data[key]) {
        const file = data[key][0];
        if (file instanceof File) {
          formData.append(key, file);
        }
      }
    });

    if (mode === "add") {
      try {
        const res = await api.post(`/admin/product/${category}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.status === true) {
          toast.success(res.data.message);
        }
        reset();
      } catch (err) {
        toast.error("Something went wrong!");
      }finally {
        setIsLoading(false);
      }
    }
    if (mode === "edit") {
      formData.append("_method", "PUT");

      try {
        const res = await api.post(
          `/admin/product/${category}/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (res.data.status === true) {
          toast.success(res.data.message);
          navigate(`/dashboard/product/${category}`);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="w-full pb-16 backdrop-blur-lg">
      {/* RESPONSIVE HEADING */}
      <h3 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold flex items-center gap-4 sm:gap-8 cursor-default mb-6 sm:mb-10">
        <NavLink
          to={`/dashboard/product/${category}`}
          className="hover:text-(--bg-accent) transition-colors ease-in-out duration-300 flex items-center"
        >
          <ArrowLeft size={32} strokeWidth={3} className="sm:scale-125" />
        </NavLink>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-6 sm:pt-8 border-t border-(--text-color)/15 text-sm sm:text-base lg:text-lg"
        encType="multipart/form-data"
      >
        {/* TWO COLUMN GRID FOR LARGE SCREENS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="bg-(--bg-accent)/5 p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col gap-6 sm:gap-8 w-full">
            {/* Mark as New */}
            <div>
              <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl flex items-center justify-start gap-4 sm:gap-5">
                <label
                  htmlFor="isNew"
                  className="font-bold cursor-pointer text-base sm:text-lg"
                >
                  Mark as New
                </label>
                <input
                  type="checkbox"
                  {...register("isNew")}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-md accent-(--bg-accent) cursor-pointer"
                  id="isNew"
                />
              </div>
            </div>

            {/* Category Field */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <StaticField
                register={register}
                name={"category"}
                inputWidth={"w-full"}
                labelID={"productCategory"}
                labelName={"Category"}
                type={"text"}
                category={category}
                errors={errors}
              />
              <p className="text-xs sm:text-sm text-red-400 mt-2">
                {errors.category?.message}
              </p>
            </div>

            {/* Dynamic Tags */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="productTag"
                  className="font-bold text-base sm:text-lg"
                >
                  Tags
                </label>
                <AddMoreFieldBtn
                  appendField={appendTag}
                  fields={tagFields}
                  maxFields={4}
                  btnText={"Add More"}
                />
              </div>
              <div className="flex items-center flex-wrap gap-4 sm:gap-6 mt-4">
                <DynamicField
                  fields={tagFields}
                  name={"tags"}
                  register={register}
                  remove={removeTag}
                  type={"text"}
                  errors={errors}
                />
              </div>
            </div>

            {/* Product Title */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <StaticField
                register={register}
                name={"title"}
                inputWidth={"w-full"}
                labelID={"productTitle"}
                labelName={"Title"}
                type={"text"}
                errors={errors}
              />
              <p className="text-xs sm:text-sm text-red-400 mt-2">
                {errors.title?.message}
              </p>
            </div>

            {/* Product Description */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <div>
                <label
                  htmlFor="productDesc"
                  className="font-bold text-base sm:text-lg"
                >
                  Description
                </label>
              </div>
              <div className="mt-4">
                <textarea
                  name="desc"
                  {...register("desc")}
                  id="productDesc"
                  rows={6}
                  placeholder="Write your product description here..."
                  className={`w-full bg-(--background)/20 outline outline-(--text-color)/30 focus:outline-(--bg-accent) py-2 px-3 rounded-lg text-sm sm:text-base transition-all ${
                    errors.desc?.message ? "outline-red-400 text-red-400" : ""
                  }`}
                ></textarea>
                <p className="text-xs sm:text-sm text-red-400 mt-2">
                  {errors.desc?.message}
                </p>
              </div>
            </div>

            {/* Pricing Rows */}
            <div className="flex flex-col sm:flex-row items-stretch justify-start gap-4 sm:gap-5">
              <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl w-full sm:w-1/2">
                <StaticField
                  inputWidth={"w-full"}
                  labelID={"productOldPrice"}
                  labelName={"Old Price"}
                  name={"oldPrice"}
                  register={register}
                  type={"number"}
                  errors={errors}
                />
                <p className="text-xs sm:text-sm text-red-400 mt-2">
                  {errors.oldPrice?.message}
                </p>
              </div>
              <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl w-full sm:w-1/2">
                <StaticField
                  inputWidth={"w-full"}
                  labelID={"productNewPrice"}
                  labelName={"New Price"}
                  name={"newPrice"}
                  register={register}
                  type={"number"}
                  errors={errors}
                />
                <p className="text-xs sm:text-sm text-red-400 mt-2">
                  {errors.newPrice?.message}
                </p>
              </div>
            </div>

            {/* Sizes Dropdowns */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="productSize"
                  className="font-bold text-base sm:text-lg"
                >
                  Sizes
                </label>
                <AddMoreFieldBtn
                  appendField={appendSize}
                  fields={sizeFields}
                  maxFields={6}
                  btnText={"Add More"}
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {sizeFields.map((size, index) => (
                  <div key={index} className="flex items-center gap-3 w-full">
                    <div className="flex-1 min-w-0">
                      <select
                        key={size.id}
                        {...register(`sizes.${index}.value`)}
                        className={`w-full outline outline-(--text-color)/30 focus:outline-(--bg-accent) py-2 px-3 rounded-lg text-sm sm:text-base bg-(--background) ${
                          errors.sizes?.[index]?.value?.message
                            ? "outline-red-400 text-red-400"
                            : ""
                        }`}
                      >
                        <option
                          disabled
                          defaultChecked={true}
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          --- Select Size ---
                        </option>
                        <option
                          value="xs"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          XS
                        </option>
                        <option
                          value="sm"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          SM
                        </option>
                        <option
                          value="md"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          MD
                        </option>
                        <option
                          value="lg"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          LG
                        </option>
                        <option
                          value="xl"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          XL
                        </option>
                        <option
                          value="xxl"
                          className="text-(--background) bg-(--bg-accent)"
                        >
                          XXL
                        </option>
                      </select>
                      {errors.sizes?.[index]?.value?.message && (
                        <p className="text-xs sm:text-sm text-red-400 mt-2">
                          {errors.sizes?.[index]?.value?.message}
                        </p>
                      )}
                    </div>
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="bg-red-400/15 text-red-400 border border-red-400/10 p-2 rounded-full cursor-pointer hover:bg-red-400/30 transition-colors ease-in-out duration-300 shrink-0"
                      >
                        <X
                          size={20}
                          strokeWidth={2.5}
                          className="sm:scale-110"
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-(--bg-accent)/5 p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col gap-6 sm:gap-8 w-full">
            {/* Dynamic Colors */}
            <div className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="productColor"
                  className="font-bold text-base sm:text-lg"
                >
                  Colors
                </label>
                <AddMoreFieldBtn
                  appendField={appendColor}
                  fields={colorFields}
                  maxFields={4}
                  btnText={"Add More"}
                />
              </div>
              <div className="flex items-center flex-wrap gap-4 sm:gap-6 mt-4">
                <DynamicField
                  fields={colorFields}
                  name={"colors"}
                  register={register}
                  remove={removeColor}
                  type={"text"}
                  errors={errors}
                />
              </div>
            </div>

            {/* Color Images Mapping Grid */}
            {colorFields.map((_, i) => (
              <div
                key={i}
                className="bg-(--text-color)/5 p-4 sm:p-5 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <label
                    htmlFor={`productImageColor${i}`}
                    className="font-bold text-base sm:text-lg"
                  >
                    Images{" "}
                    <span className="text-xs sm:text-sm font-semibold opacity-80">
                      (for color {i + 1})
                    </span>
                  </label>
                </div>

                {/* CLEAN GRID FOR IMAGE INPUTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(4)].map((_, idx) => {
                    const name = `color${i}image${idx}`;
                    return (
                      <div key={idx} className="flex flex-col w-full">
                        <input
                          type="file"
                          {...register(name)}
                          id={name}
                          className={`w-full outline outline-(--text-color)/30 focus:outline-(--bg-accent) py-2 px-3 rounded-lg text-xs sm:text-sm bg-(--background) cursor-pointer ${
                            errors[name]?.message
                              ? "outline-red-400 text-red-400"
                              : ""
                          }`}
                        />
                        {errors[name]?.message && (
                          <p className="text-xs text-red-400 mt-1.5">
                            {errors[name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="mt-8 sm:mt-10 flex justify-center w-full">
              <button
                type={isLoading ? 'button': 'submit'}
                className={`w-full py-3.5 rounded-2xl font-bold ${isLoading ? 'cursor-progress' : ' hover:bg-(--text-color) hover:text-(--background) hover:border-(--text-color) cursor-pointer'} bg-(--bg-accent) text-(--background) border-2 border-(--bg-accent) transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-sm`}
              >
                {isLoading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT SECTION */}
      </form>
    </div>
  );
}

export default AddEditProduct;
