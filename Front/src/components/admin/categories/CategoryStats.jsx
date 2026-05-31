import { Layers, Palette, Tag } from "lucide-react";

function StatCard({ Icon, iconClassName, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-[#303030]">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default function CategoryStats({ categories }) {
  const iconCount = categories.filter((category) =>
    category.icon?.trim(),
  ).length;
  const colorCount = new Set(
    categories.map((category) => category.color).filter(Boolean),
  ).size;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        Icon={Layers}
        iconClassName="bg-blue-50 text-[#266fdb]"
        label="categories"
        value={categories.length}
      />

      <StatCard
        Icon={Tag}
        iconClassName="bg-emerald-50 text-emerald-700"
        label="Icônes configurées"
        value={iconCount}
      />

      <div className="sm:col-span-2 lg:col-span-1">
        <StatCard
          Icon={Palette}
          iconClassName="bg-amber-50 text-amber-700"
          label="Couleurs actives"
          value={colorCount}
        />
      </div>
    </div>
  );
}
