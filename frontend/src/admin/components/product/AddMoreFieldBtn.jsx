import { Plus } from "lucide-react";
import React from "react";

function AddMoreFieldBtn({
  btnText,
  appendField,
  fields,
  maxFields,
  type = "",
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (fields.length >= maxFields) return;
        {
          type === "images"
            ? appendField({ value: null })
            : appendField({ value: "" });
        }
      }}
      className="bg-(--bg-accent)/20 text-(--bg-accent) hover:bg-(--bg-accent)/30 border border-(--bg-accent)/10 flex items-center gap-2 cursor-pointer transition-colors ease-in-out duration-300 font-bold px-3 py-1.5 text-lg rounded-lg"
    >
      <Plus strokeWidth={2.5}/>
      {btnText}
    </button>
  );
}

export default AddMoreFieldBtn;
