import Link from "next/link";

type NavigationButtonsProps = {
  back: string;
  next: string;
  home?: boolean;
  stepIsValidated?: boolean;
};

export const NavigationButtons = ({
  back,
  next,
  home,
  stepIsValidated = true,
}: NavigationButtonsProps) => {
  return (
    <div className="form-group">
    <button type="submit" className="btn btn-primary mr-1">Register</button>
    <button type="button" className="btn btn-secondary">Reset</button>
</div>
  );
};
