import { Controller } from "react-hook-form";

export const InputGlobal = ({
  control,
  name,
  type = "text",
}: {
  name: string;
  control: any;
  type?: string;
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => {
      const { value, onChange } = field;
      const err = fieldState.error?.message;

      return (
        <div
          className="d-flex"
          style={{ marginBottom: 12, flexDirection: "column" }}
        >
          {name}
          <input
            placeholder={name}
            value={value}
            onChange={(e) => onChange(e?.target.value)}
            type={type}
          />
          {err && <div style={{ color: "red" }}>{err}</div>}
        </div>
      );
    }}
  />
);
