<script>
  import { logout, user } from '@/stores/userStore.js';
  import { CircleUserRound, Search } from 'lucide-svelte';
  import { navigate } from 'svelte-routing';
  import { handleSearch } from '@/utils/datasetUtil.js';
  import { derived, writable } from 'svelte/store';
  import { Link } from 'svelte-routing';

  let searchQuery = $state('');

  const pathname = writable(window.location.pathname);

  const isSearchPage = derived(pathname, p => p.includes('/search'));

  function handleLogin() {
    navigate('/login');
  }
</script>

<header class="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg">
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <Link to="/" class="flex items-center space-x-3">
        <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
          <div class="relative">
            <img class="h-8 w-8" src="/datasetICON.png" alt="logo" />
          </div>
          <div class="text-white">
            <div class="font-bold text-lg leading-tight">Dataset</div>
            <div class="text-xs text-blue-200 leading-tight">Marketplace</div>
          </div>
        </div>
      </Link>
      {#if !$isSearchPage}
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <form onsubmit={e => handleSearch(e, searchQuery)} class="w-full">
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search datasets, categories, or providers..."
                class="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
              />
              <div
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              >
                <Search />
              </div>
            </div>
          </form>
        </div>
      {/if}
      <div class="flex items-center space-x-4">
        {#if !$user}
          <div class="hidden lg:flex items-center space-x-3">
            <button
              onclick={handleLogin}
              class="flex items-center space-x-1 px-4 py-2 text-white hover:text-teal-300 transition-colors duration-200 font-medium"
            >
              <span>Login</span>
            </button>
            <button
              class="flex items-center space-x-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <span>Sign Up</span>
            </button>
          </div>
        {:else}
          <div class="flex items-center space-x-3">
            <Link to="/profile">
              <CircleUserRound class="h-8 w-8 text-white" />
            </Link>
            <button
              onclick={logout}
              class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Logout
            </button>
            {#if $user.role.toUpperCase() === 'ADMIN'}
              <Link
                to="/dashboard"
                class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>
