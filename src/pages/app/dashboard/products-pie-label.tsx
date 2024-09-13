interface ProductsPieLabel {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	value: number;
	product: string;
}

export function ProductsPieLabel({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	value,
	product,
}: ProductsPieLabel) {
	const RADIAN = Math.PI / 180;
	const radius = 12 + innerRadius + (outerRadius - innerRadius);
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			className="fill-muted-foreground text-xs"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{product.length > 12 ? product.substring(0, 12).concat("...") : product} (
			{value})
		</text>
	);
}
