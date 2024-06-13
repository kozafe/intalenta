import { FieldValues, useForm } from "react-hook-form";
import { InputGlobal } from "../../components/inputs";
import { Book } from "./details";

const dateMaker = (date: string) => {
  const correctDate = new Date(date);

  const year = correctDate.getFullYear();
  const month = String(correctDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1 and pad with leading zeros if necessary
  const day = String(correctDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const EditDetailsComponent = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Book;
  onSubmit: any;
}) => {
  const { publicationDate } = defaultValues || {};

  const modified = publicationDate
    ? {
        ...defaultValues,
        publicationDate: dateMaker(publicationDate),
      }
    : {};

  const { control, handleSubmit, setError } = useForm<FieldValues>({
    defaultValues: modified,
  }); // Specify the type of form values as Book

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputGlobal name="title" control={control} />
      <InputGlobal name="author" control={control} />
      <InputGlobal name="cover" control={control} />
      <InputGlobal name="description" control={control} />
      <InputGlobal name="publicationDate" control={control} type="date" />
      <button
        onClick={handleSubmit((val) => {
          const { id, ...rest } = val;
          let passed = true;

          Object.keys(rest).forEach((key) => {
            const value = rest[key];
            if (value) return;
            passed = false;

            setError(key, { message: "please fill out this field" });
          });

          if (!passed) return;

          onSubmit(val);
        })}
      >
        submit
      </button>
    </div>
  );
};
