interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export default function FormField({ label, value, onChange, placeholder, type = "text" }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-sm font-medium text-foreground/70">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-3 font-body text-foreground focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/10"
      />
    </label>
  );
}
