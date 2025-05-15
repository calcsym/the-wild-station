import Link from "next/link";
import Navigation from "./_components/Navigation";

export default function Page() {
  return (
    <div>
      <h1>The Wild Station. Welcome to Safe, Fun Paradise.</h1>

      <Link to href="/cabins">
        Explore luxury Cabins
      </Link>
    </div>
  );
}
