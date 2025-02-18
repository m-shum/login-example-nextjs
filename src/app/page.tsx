// import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.flexContainer}>
        <LoginForm />
      </div>
    </main>
  );
}
