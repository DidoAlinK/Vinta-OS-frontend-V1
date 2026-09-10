interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
}

export function DonutRing({ data, size = 120, thickness = 14 }: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background ring */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--divider)" strokeWidth={thickness} />
      {/* Segments */}
      {data.map((segment) => {
        if (segment.value === 0) return null;
        const pct = segment.value / total;
        const dashLength = circumference * pct;
        const dashOffset = circumference * offset;
        offset += pct;
        return (
          <circle
            key={segment.label}
            cx={center} cy={center} r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={thickness}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={-dashOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
          />
        );
      })}
      {/* Center text */}
      <text x={center} y={center} textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, fill: 'var(--text)' }}>
        {total}
      </text>
    </svg>
  );
}
