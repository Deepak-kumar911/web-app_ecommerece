import { ScaleLoader } from "react-spinners";

function Loader({color,size}) {
  return (
    <div className="sweet-loading">
      <ScaleLoader
        color={color||"rgb(54 83 215)"}
        loading={true}
        cssOverride={{ }}
        size={size || 150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;