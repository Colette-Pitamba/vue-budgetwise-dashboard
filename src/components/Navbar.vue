<script setup>
  /**
   * Nav Component
   * 
   * This component implements a fixed navigation bar. 
   * 
   * links for "Home", "Community", and "FAQs", while the right section shows the user's profile image, 
   * username, and a dropdown icon for additional options.
   * 
   */
</script>

<template>
  <nav class="nav-container">
    <div class="nav-content">
      <div class="navbar-left">
        <div class="logo-container">
          <img src="/src/assets/img/logo.png" alt="Logo" class="logo" />
          <span class="brand-name">Budgetwise</span>
        </div>
        
        <div class="nav-links">
          <a href="#" class="nav-link active">Home</a>
          <a href="#" class="nav-link">Community</a>
          <a href="#" class="nav-link">FAQs</a>
        </div>
      </div>
      
      <div class="user-profile">
        <img src="/src/assets/img/profile-img.png" alt="Profile Image" class="profile-image" />

        <span class="username">John Doe</span>

        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_51_277)">
            <path d="M6.175 7.66147L10 11.4781L13.825 7.66147L15 8.83647L10 13.8365L5 8.83647L6.175 7.66147Z" fill="#2B2B2B"/>
          </g>

          <defs>
            <clipPath id="clip0_51_277">
              <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </nav>

  <!-- Spacer div to prevent content from being hidden under the fixed nav -->
  <div class="nav-spacer"></div>
</template>

<style scoped>
  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 48px;
    background: #FFFFFF;
    border-bottom: 1px solid #F3F3F3;
    box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.08);
    z-index: 1000;
  }

  .nav-spacer {
    height: 48px;
    width: 100%;
  }

  .nav-content {
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
  }

  .navbar-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 69px;
    width: 457px;
    height: 24px;
  }

  .logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 4px;
    width: 119px;
    height: 24px;
  }

  .logo {
    width: 24px;
    height: 24px;
    border-radius: 3px;
  }

  .brand-name {
    width: 91px;
    height: 21px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16.2px;
    line-height: 130%;
    text-align: center;
    letter-spacing: -0.03em;
    color: #2B2B2B;
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 48px;
    width: 269px;
    height: 21px;
  }

  .nav-link {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.5px;
    color: #707070;
    text-decoration: none;
  }

  .nav-link.active {
    color: #4C83D8;
    border-bottom: 2px solid #4C83D8;
  }

  .user-profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 40px 0px 0px;
    gap: 8px;
    width: 181px;
    height: 24px;
  }

  .profile-image {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #D9D9D9;
  }

  .username {
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.5px;
    color: #2B2B2B;
  }

  .dropdown-icon {
    width: 20px;
    height: 20px;
  }
</style>