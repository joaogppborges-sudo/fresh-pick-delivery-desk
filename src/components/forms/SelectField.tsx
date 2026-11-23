import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldClass } from "@/components/shared/FormField";

type SelectFieldProps = {
  id: string;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export function SelectField({ id, placeholder, options, disabled }: SelectFieldProps) {
  return (
    <Select {...(disabled !== undefined ? { disabled } : {})}>
      <SelectTrigger id={id} className={fieldClass}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
