import { useAppSelector } from "../../redux/store/hook";

function MainDashborad() {
  const { user }: any = useAppSelector((state) => state.auth);
  console.log(user)
  return (
    <div>MainDashborad</div>
  )
}

export default MainDashborad