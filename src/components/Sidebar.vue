<script setup>
  /**
   * Sidebar Component
   * 
   * This component implements a sidebar navigation menu. 
   * The sidebar provides quick access to various sections such as "Overview", "Budget", 
   * "Transactions", "Trends", "Savings Goals", "Alerts", and "Rules".
   * 
   */
</script>

<template>
  <aside class="sidebar">
    <div class="menu-links">
      <div class="menu-item active">
        <div class="menu-indicator"></div>
        <span class="menu-text">Overview</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Budget</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Transactions</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Trends</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Savings Goals</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Alerts</span>
      </div>

      <div class="menu-item">
        <div class="menu-indicator"></div>
        <span class="menu-text">Rules</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  .sidebar {
    box-sizing: border-box;
    position: relative;
    width: 184px;
    height: 100%;
    background: #FFFFFF;
    border-right: 1px solid #DBDBDB;
  }

  .menu-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    position: absolute;
    width: 147px;
    height: 268px;
    left: 16px;
    top: 114px;
  }

  .menu-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 100%;
    height: 28px;
  }

  .menu-indicator {
    width: 20px;
    height: 0px;
    border: 2px solid transparent;
    transform: rotate(90deg);
  }

  .menu-item.active .menu-indicator {
    border-color: #2B2B2B;
  }

  .menu-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    display: flex;
    align-items: center;
    color: #2B2B2B;
    text-align: left;
    justify-content: flex-start;
  }

  .menu-item.active .menu-text {
    font-weight: 600;
  }
</style>