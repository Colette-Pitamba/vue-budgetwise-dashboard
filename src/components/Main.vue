<script setup>
  /**
  * Home View Component
  * 
  * This component serves as the main dashboard layout for the budget application.
  * 
  * Features:
  * - Two-column layout with budget management on the left and analytics on the right
  * - Sidebar navigation for app-wide menu access
  * - Budget summary card displaying current financial status
  * - Six-month spending snapshot chart for trend visualization
  * - Recent transactions list for quick access to latest activity
  * 
  */

  import { ref } from 'vue';

  import Barchart from './Barchart.vue';
  import BudgetCard from './BudgetCard.vue';
  import BudgetView from './BudgetView.vue';
  import RecentTransactions from './RecentTransactions.vue';
  import Sidebar from '@/components/Sidebar.vue';

  const budgetSummary = ref({
     spent: 800,
     spentValue: 800,
     available: 1200,
     availableValue: 1200,
     budget: 2000,
     budgetValue: 2000
   });
</script>

<template>
  <div class="main-layout flex">
    <Sidebar />
    
    <div class="flex-1 flex">
      <BudgetView />

      <!-- Analytics Section -->
      <aside class="w-[408px] ml-[99px] mt-[32px]">
        <BudgetCard
          :spent="budgetSummary.spent"
          :available="budgetSummary.available"
          :budget="budgetSummary.budget"
        />

        <!-- 6 Month Snapshot -->
        <div class="mt-[24px] mb-[24px]">
          <h2 class="snapshot-title">6 Month Snapshot</h2> <!-- send this as a title prop to barChart -->

          <Barchart />
        </div>

        <!-- Recent Transactions -->
        <RecentTransactions />
      </aside>
    </div>
  </div>
</template>

<style scoped>
  .main-layout {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  .snapshot-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
</style>