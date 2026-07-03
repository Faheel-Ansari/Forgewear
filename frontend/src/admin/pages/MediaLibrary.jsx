import { File, SaveAll } from "lucide-react";
import { FieldCard } from "../../index";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { mediaLibrarySchema } from "../../schema/schema";

const fieldsArr = [
  {
    mainHeading: "Hero Images",
    fieldTitleArr: [
      { title: "Left Pill Image", name: "heroLImg" },
      { title: "Center Pill Image", name: "heroCImg" },
      { title: "Right Pill Image", name: "heroRImg" },
    ],
  },
  {
    mainHeading: "Hero Categories Images",
    fieldTitleArr: [
      { title: "Shirt Category Image", name: "heroCatShirtImg" },
      { title: "Pant Category Image", name: "heroCatPantImg" },
      { title: "Hoodie Category Image", name: "heroCatHoodieImg" },
      { title: "Jacket Category Image", name: "heroCatJacketImg" },
      { title: "Shoes Category Image", name: "heroCatShoesImg" },
    ],
  },
  {
    mainHeading: "Bottom Categories Images",
    fieldTitleArr: [
      { title: "Shirt Category Image", name: "bottomCatShirtImg" },
      { title: "Pant Category Image", name: "bottomCatPantImg" },
      { title: "Hoodie Category Image", name: "bottomCatHoodieImg" },
      { title: "Jacket Category Image", name: "bottomCatJacketImg" },
      { title: "Shoes Category Image", name: "bottomCatShoesImg" },
    ],
  },
  {
    mainHeading: "Search Cards Categories Images",
    fieldTitleArr: [
      { title: "Shirt Category Image", name: "searchCatShirtImg" },
      { title: "Pant Category Image", name: "searchCatPantImg" },
      { title: "Hoodie Category Image", name: "searchCatHoodieImg" },
      { title: "Jacket Category Image", name: "searchCatJacketImg" },
      { title: "Shoes Category Image", name: "searchCatShoesImg" },
    ],
  },
];

function MediaLibrary() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(mediaLibrarySchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      // React Hook Form returns a FileList array for file inputs
      const fileList = data[key];

      // Check if the field actually contains a file list with items
      if (fileList && fileList instanceof FileList && fileList.length > 0) {
        const file = fileList[0];
        formData.append(key, file);
      }
    });

    try {
      const res = await api.post("/admin/media/library/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="w-full pb-20 min-h-full backdrop-blur-lg">
      {/* RESPONSIVE HEADER */}
      <div className="pb-6 sm:pb-8 flex justify-between items-center border-b border-(--text-color)/20">
        <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold cursor-default">
          Manage Media Library
        </h2>
      </div>

      {/* MAIN FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-10 text-sm sm:text-base"
      >
        {fieldsArr.map((item, idx) => (
          <FieldCard
            key={idx}
            mainHeading={item.mainHeading}
            fieldArr={item.fieldTitleArr}
            register={register}
            errors={errors}
          />
        ))}

        {/* SUBMIT ROW */}
        <div className="mt-8 sm:mt-10 flex justify-center sm:justify-start w-full">
          <button
            type="submit"
            className="w-full max-w-xs sm:max-w-md py-3.5 rounded-2xl font-bold text-base sm:text-lg bg-(--bg-accent) text-(--background) hover:text-(--background) hover:bg-(--text-color) flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-sm"
          >
            <SaveAll size={20} strokeWidth={2.5} className="sm:scale-110" />
            Save Library
          </button>
        </div>
      </form>
    </div>
  );
}

export default MediaLibrary;
