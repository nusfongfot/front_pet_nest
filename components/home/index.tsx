import BestSeller from "./best_seller";
import Header from "./header";
import Recommend from "./recommend";
import ShopCategory from "./shop_cate";
import WhyChooseUs from "./why_choose";

type Props = {};
export default function HomeComponent({}: Props) {
  return (
    <div>
      <Header />
      <ShopCategory />
      <Recommend />
      <WhyChooseUs />
    </div>
  );
}
