interface Props {
  source?: string
  className? : string
}

export default function ResponsiveImage({ source , className }: Props) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <img
          src={source}
          alt="Cover"
          className={`${className} border border-gray-200 rounded-xl dark:border-gray-800`}
        />
      </div>
    </div>
  );
}
