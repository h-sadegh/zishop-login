import useSeller from "../seller/UseSeller";

const NavigationBarLogo = ({
  logo,
  title,
  onOptionClick,
}: {
  logo?: string;
  title?: string;
  onOptionClick?: () => void;
}) => {
  const { data: seller } = useSeller();
  return (
    <div
      style={{
        height: 72,
        display: "flex",
        alignItems: "center",
        padding: "16px 18px",
        gap: 8,
        backgroundColor: "#fff",
        borderBottom: "1px solid #c4c4c4",
      }}
    >
      <img
        style={{
          objectFit: "cover",
          borderRadius: 8,
          width: 40,
          height: 40,
        }}
        width={72}
        height={72}
        src={`${logo || seller?.logo_path}`}
        alt={"آیکن فروشگاه"}
      />
      <div
        style={{
          flex: 1,
          cursor: "default",
        }}
      >
        {title || seller?.name}
      </div>
      <img
        style={{ cursor: "pointer", width: 40, height: 40 }}
        onClick={onOptionClick}
        width="40"
        height="40"
        src={"/static/basket.svg"}
        alt={"Send icon"}
      />
    </div>
  );
};

export default NavigationBarLogo;
