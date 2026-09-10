interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}

export function SegmentedControl({ options, value, onChange, size = 'md' }: SegmentedControlProps) {
  return (
    <div className="seg">
      {options.map((opt) => (
        <button
          key={opt}
          className={value === opt ? 'active' : ''}
          onClick={() => onChange(opt)}
          style={{ fontSize: size === 'sm' ? 11 : 12 }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
