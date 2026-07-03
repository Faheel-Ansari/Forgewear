import { X } from "lucide-react";
import { useState } from "react";

function DynamicField({ fields, remove, register, name, type, errors = {} }) {
  
  return (
    <>
      {fields.map((tag, index) => (
        <div key={tag.id} className="flex items-center gap-3">
          <div>
            <input
              type={type}
              {...register(`${name}.${index}.value`)}
              placeholder={
                name === "tags"
                  ? "eg: Summer, Winter..."
                  : "eg: #2A34CD , #45BA23..."
              }
              className={`outline outline-(--text-color)/50 focus:outline-(--bg-accent) py-1.5 px-3 rounded-lg ${errors[name]?.[index]?.value?.message ? "outline-red-400 text-red-400" : ""}`}
            />
            {errors[name]?.[index]?.value?.message && (
              <p className="text-sm text-red-400 mt-2">
                {errors[name]?.[index]?.value?.message}
              </p>
            )}
          </div>
          {index !== 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-400/15 text-red-400 border border-red-400/10 p-2 rounded-full cursor-pointer hover:bg-red-400/30 transition-colors ease-in-out duration-300"
            > 
            <X size={26} strokeWidth={2.5}/>
              
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default DynamicField;
