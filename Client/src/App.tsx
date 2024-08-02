import './App.css';
import TotalMembers from './components/TotalMembers';
import GrowthRate from './components/GrowthRate';
import EngagementRate from './components/EngagementRate';
import ActiveInactiveMembers from './components/ActiveInactiveMembers';
import TopContributors from './components/TopContributors';

function App() {

  return (
    <div className="App">
      <h1>Telegram Community Dashboard</h1>
      <div className="dashboard">
        <div className='ds1'>
          <TotalMembers />
          <GrowthRate />
          <TopContributors />
        </div>
        <div className='ds2'>
          <ActiveInactiveMembers />
          <EngagementRate />
        </div>
      </div>
    </div>
  );
}

export default App;
