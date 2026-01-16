import { cards } from "@/app/admin/lib/data";
import Card from "@/app/admin/ui/dashboard/card/card";
import Chart from "@/app/admin/ui/dashboard/chart/chart";
import styles from "@/app/admin/ui/dashboard/dashboard.module.css";
import Rightbar from "@/app/admin/ui/dashboard/rightbar/rightbar";
import Transactions from "@/app/admin/ui/dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;


