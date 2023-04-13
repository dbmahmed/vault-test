import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SwaggerAPIApi from '../apis/SwaggerAPIApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import abbrTeamName from '../global-functions/abbrTeamName';
import compareBarstool from '../global-functions/compareBarstool';
import compareBetMGM from '../global-functions/compareBetMGM';
import compareBetRivers from '../global-functions/compareBetRivers';
import compareCaesars from '../global-functions/compareCaesars';
import compareDraftKings from '../global-functions/compareDraftKings';
import compareFanDuel from '../global-functions/compareFanDuel';
import compareFoxBet from '../global-functions/compareFoxBet';
import comparePointsBet from '../global-functions/comparePointsBet';
import comparePrizePicks from '../global-functions/comparePrizePicks';
import compareUnderdog from '../global-functions/compareUnderdog';
import compareUnibet from '../global-functions/compareUnibet';
import segmentLogScreen from '../global-functions/segmentLogScreen';
import segmentLogTrack from '../global-functions/segmentLogTrack';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  Button,
  Circle,
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  ScreenContainer,
  Shadow,
  Surface,
  Swiper,
  SwiperItem,
  Touchable,
  WebView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { useAnalytics } from '@segment/analytics-react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const GamesScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const segment = useAnalytics();
  const dateTimeShort = commence_time => {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(commence_time);

    let str = month[date.getMonth()] + ' ' + date.getDate() + ', ';
    if (date.getHours() >= 12) {
      if (date.getHours() == 12) {
        str =
          str +
          date.getHours() +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'p';
      } else {
        str =
          str +
          (date.getHours() - 12) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'p';
      }
    } else {
      if (date.getHours() == 0) {
        str =
          str +
          (date.getHours() + 12) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'a';
      } else {
        str =
          str +
          date.getHours() +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          'a';
      }
    }
    return str;

    /*
const now = new Date(); //added

if(now.getTime() > date.getTime()){  //this line and 2 lines below
return " ";
} else {
let str = month[date.getMonth()] + " " + date.getDate() + ", "
if(date.getHours() >= 12){
  if(date.getHours() == 12){
    str = str + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "p"
  }else{
    str = str + (date.getHours() - 12) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "p"
  }
}else{
  if(date.getHours() == 0){
    str = str + (date.getHours() + 12) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "a"
  }else{
    str = str + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "a"
  }
}
return str
};
*/
  };

  const oddsAmericanSyntax = oddsAmerican => {
    if (!oddsAmerican) {
      return '-';
    } else if (oddsAmerican < 0) {
      return '(' + oddsAmerican + ')';
    } else {
      return '(+' + oddsAmerican + ')';
    }
  };

  const oddsChangeLeague = x => {
    //Constants.oddsDisplayed[0] = x;
    //return [x,Constants.oddsDisplayed[1]];

    Constants.oddsDisplayedDevice[0] = x;
    return [x, Constants.oddsDisplayedDevice[1]];
  };

  const abbrTeamName = x => {
    const teamsTable = {
      // NFL
      'Arizona Cardinals': 'ARI',
      'Atlanta Falcons': 'ATL',
      'Baltimore Ravens': 'BAL',
      'Buffalo Bills': 'BUF',
      'Carolina Panthers': 'CAR',
      'Chicago Bears': 'CHI',
      'Cincinnati Bengals': 'CIN',
      'Cleveland Browns': 'CLE',
      'Dallas Cowboys': 'DAL',
      'Denver Broncos': 'DEN',
      'Detroit Lions': 'DET',
      'Green Bay Packers': 'GB',
      'Houston Texans': 'HOU',
      'Indianapolis Colts': 'IND',
      'Jacksonville Jaguars': 'JAC',
      'Kansas City Chiefs': 'KC',
      'Las Vegas Raiders': 'LV',
      'Los Angeles Chargers': 'LAC',
      'Los Angeles Rams': 'LAR',
      'Miami Dolphins': 'MIA',
      'Minnesota Vikings': 'MIN',
      'New England Patriots': 'NE',
      'New Orleans Saints': 'NO',
      'New York Giants': 'NYG',
      'New York Jets': 'NYJ',
      'Philadelphia Eagles': 'PHI',
      'Pittsburgh Steelers': 'PIT',
      'San Francisco 49ers': 'SF',
      'Seattle Seahawks': 'SEA',
      'Tampa Bay Buccaneers': 'TB',
      'Tennessee Titans': 'TEN',
      'Washington Commanders': 'WAS',
      // NBA
      'Atlanta Hawks': 'ATL',
      'Brooklyn Nets': 'BKN',
      'Boston Celtics': 'BOS',
      'Charlotte Hornets': 'CHA',
      'Chicago Bulls': 'CHI',
      'Cleveland Cavaliers': 'CLE',
      'Dallas Mavericks': 'DAL',
      'Denver Nuggets': 'DEN',
      'Detroit Pistons': 'DET',
      'Golden State Warriors': 'GSW',
      'Houston Rockets': 'HOU',
      'Indiana Pacers': 'IND',
      'Los Angeles Clippers': 'LAC',
      'Los Angeles Lakers': 'LAL',
      'Memphis Grizzlies': 'MEM',
      'Miami Heat': 'MIA',
      'Milwaukee Bucks': 'MIL',
      'Minnesota Timberwolves': 'MIN',
      'New Orleans Pelicans': 'NOP',
      'New York Knicks': 'NYK',
      'Oklahoma City Thunder': 'OKC',
      'Orlando Magic': 'ORL',
      'Philadelphia 76ers': 'PHI',
      'Phoenix Suns': 'PHX',
      'Portland Trail Blazers': 'POR',
      'Sacramento Kings': 'SAC',
      'San Antonio Spurs': 'SAS',
      'Toronto Raptors': 'TOR',
      'Utah Jazz': 'UTA',
      'Washington Wizards': 'WAS',
      // NCAA
      'Boston College Eagles': 'Boston College',
      'Clemson Tigers': 'Clemson',
      'Duke Blue Devils': 'Duke',
      'Florida State Seminoles': 'Florida State',
      'Georgia Tech Yellow Jackets': 'Georgia Tech',
      'Louisville Cardinals': 'Louisville',
      'Miami (FL) Hurricanes': 'Miami (FL)',
      'NC State Wolfpack': 'NC State',
      'Pittsburgh Panthers': 'Pittsburgh',
      'Syracuse Orange': 'Syracuse',
      'North Carolina Tar Heels': 'North Carolina',
      'Virginia Cavaliers': 'Virginia',
      'Virginia Tech Hokies': 'Virginia Tech',
      'Wake Forest Demon Deacons': 'Wake Forest',
      'Illinois Fighting Illini': 'Illinois',
      'Indiana Hoosiers': 'Indiana',
      'Iowa Hawkeyes': 'Iowa',
      'Michigan Wolverines': 'Michigan',
      'Michigan State Spartans': 'Michigan State',
      'Minnesota Golden Gophers': 'Minnesota',
      'Nebraska Cornhuskers': 'Nebraska',
      'Northwestern Wildcats': 'Northwestern',
      'Ohio State Buckeyes': 'Ohio State',
      'Penn State Nittany Lions': 'Penn State',
      'Purdue Boilermakers': 'Purdue',
      'Rutgers Scarlet Knights': 'Rutgers',
      'Maryland Terrapins': 'Maryland',
      'Wisconsin Badgers': 'Wisconsin',
      'Baylor Bears': 'Baylor',
      'Iowa State Cyclones': 'Iowa State',
      'Kansas Jayhawks': 'Kansas',
      'Kansas State Wildcats': 'Kansas State',
      'Oklahoma Sooners': 'Oklahoma',
      'Oklahoma State Cowboys': 'Oklahoma State',
      'TCU Horned Frogs': 'TCU',
      'Texas Longhorns': 'Texas',
      'Texas Tech Red Raiders': 'Texas Tech',
      'West Virginia Mountaineers': 'West Virginia',
      'Arizona Wildcats': 'Arizona',
      'Arizona State Sun Devils': 'Arizona State',
      'California Golden Bears': 'California',
      'Colorado Buffaloes': 'Colorado',
      'Oregon Ducks': 'Oregon',
      'Oregon State Beavers': 'Oregon State',
      'Stanford Cardinal': 'Stanford',
      'UCLA Bruins': 'UCLA',
      'USC Trojans': 'USC',
      'Utah Utes': 'Utah',
      'Washington Huskies': 'Washington',
      'Washington State Cougars': 'Washington State',
      'Alabama Crimson Tide': 'Alabama',
      'Arkansas Razorbacks': 'Arkansas',
      'Auburn Tigers': 'Auburn',
      'Florida Gators': 'Florida',
      'Georgia Bulldogs': 'Georgia',
      'Kentucky Wildcats': 'Kentucky',
      'LSU Tigers': 'LSU',
      'Ole Miss Rebels': 'Ole Miss',
      'Mississippi State Bulldogs': 'Mississippi State',
      'Missouri Tigers': 'Missouri',
      'South Carolina Gamecocks': 'South Carolina',
      'Tennessee Volunteers': 'Tennessee',
      'Texas A&M Aggies': 'Texas A&M',
      'Vanderbilt Commodores': 'Vanderbilt',
      'BYU Cougars': 'BYU',
      'Army Black Knights': 'Army',
      'UMass Minutemen': 'UMass',
      'Notre Dame Fighting Irish': 'Notre Dame',
      'Cincinnati Bearcats': 'Cincinnati',
      'UConn Huskies': 'UConn',
      'ECU Pirates': 'ECU',
      'Houston Cougars': 'Houston',
      'Memphis Tigers': 'Memphis',
      'Navy Midshipmen': 'Navy',
      'SMU Mustangs': 'SMU',
      'South Florida Bulls': 'South Florida',
      'Temple Owls': 'Temple',
      'Tulane Green Wave': 'Tulane',
      'Tulsa Golden Hurricane': 'Tulsa',
      'UCF Knights': 'UCF',
      'Charlotte 49ers': 'Charlotte',
      'FAU Owls': 'FAU',
      'FIU Panthers': 'FIU',
      'Louisiana Tech Bulldogs': 'Louisiana Tech',
      'Marshall Thundering Herd': 'Marshall',
      'Middle Tennessee Blue Raiders': 'Middle Tennessee',
      'North Texas Mean Green': 'North Texas',
      'Old Dominion Monarchs': 'Old Dominion',
      'Rice Owls': 'Rice',
      'Southern Miss Golden Eagles': 'Southern Miss',
      'UTEP Miners': 'UTEP',
      'UTSA Roadrunners': 'UTSA',
      'WKU Hilltoppers': 'WKU',
      'Akron Zips': 'Akron',
      'Ball State Cardinals': 'Ball State',
      'Bowling Green Falcons': 'Bowling Green',
      'Buffalo Bulls': 'Buffalo',
      'Central Michigan Chippewas': 'Central Michigan',
      'Eastern Michigan Eagles': 'Eastern Michigan',
      'Kent State Golden Flashes': 'Kent State',
      'Miami (OH) Redhawks': 'Miami (OH)',
      'Northern Illinois Huskies': 'Northern Illinois',
      'Ohio Bobcats': 'Ohio',
      'Toledo Rockets': 'Toledo',
      'Western Michigan Broncos': 'Western Michigan',
      'Air Force Falcons': 'Air Force',
      'Boise State Broncos': 'Boise State',
      'Colorado State Rams': 'Colorado State',
      'Fresno State Bulldogs': 'Fresno State',
      'Hawaii Rainbow Warriors': 'Hawaii',
      'Nevada Wolf Pack': 'Nevada',
      'New Mexico Lobos': 'New Mexico',
      'San Diego State Aztecs': 'San Diego State',
      'San José State Spartans': 'San José State',
      'UNLV Rebels': 'UNLV',
      'Utah State Aggies': 'Utah State',
      'Wyoming Cowboys': 'Wyoming',
      'Appalachian State Mountaineers': 'Appalachian State',
      'Arkansas State Red Wolves': 'Arkansas State',
      'Georgia Southern Eagles': 'Georgia Southern',
      'Georgia State Panthers': 'Georgia State',
      'Idaho Vandals': 'Idaho',
      "Louisiana Lafayette Ragin' Cajuns": 'Louisiana Lafayette',
      'Louisiana Monroe Warhawks': 'Louisiana Monroe',
      'New Mexico State Aggies': 'New Mexico State',
      'South Alabama Jaguars': 'South Alabama',
      'Texas State Bobcats': 'Texas State',
      'Troy Trojans': 'Troy',
      'Cal Poly Mustangs': 'Cal Poly',
      'Eastern Washington Eagles': 'Eastern Washington',
      'Idaho State Bengals': 'Idaho State',
      'Montana Grizzlies': 'Montana',
      'Montana State Bobcats': 'Montana State',
      'North Dakota Fighting Hawks': 'North Dakota',
      'Northern Arizona Lumberjacks': 'Northern Arizona',
      'Northern Colorado Bears': 'Northern Colorado',
      'Portland State Vikings': 'Portland State',
      'Sacramento State Hornets': 'Sacramento State',
      'Southern Utah Thunderbirds': 'Southern Utah',
      'UC Davis Aggies': 'UC Davis',
      'Weber State Wildcats': 'Weber State',
      'Charleston Southern Buccaneers': 'Charleston Southern',
      'Coastal Carolina Chanticleers': 'Coastal Carolina',
      "Gardner-Webb Runnin' Bulldogs": 'Gardner-Webb',
      'Kennesaw State Owls': 'Kennesaw State',
      'Liberty Flames': 'Liberty',
      'Monmouth Hawks': 'Monmouth',
      'Presbyterian Blue Hose': 'Presbyterian',
      'Albany Great Danes': 'Albany',
      "Delaware Fightin' Blue Hens": 'Delaware',
      'Elon Phoenix': 'Elon',
      'James Madison Dukes': 'James Madison',
      'Maine Black Bears': 'Maine',
      'New Hampshire Wildcats': 'New Hampshire',
      'Rhode Island Rams': 'Rhode Island',
      'Richmond Spiders': 'Richmond',
      'Stony Brook Seawolves': 'Stony Brook',
      'Towson Tigers': 'Towson',
      'Villanova Wildcats': 'Villanova',
      'William & Mary Tribe': 'William & Mary',
      'Brown Bears': 'Brown',
      'Cornell Big Red': 'Cornell',
      'Columbia Lions': 'Columbia',
      'Dartmouth Big Green': 'Dartmouth',
      'Harvard Crimson': 'Harvard',
      'UPenn Quakers': 'UPenn',
      'Princeton Tigers': 'Princeton',
      'Yale Bulldogs': 'Yale',
      'Bethune-Cookman Wildcats': 'Bethune-Cookman',
      'Delaware State Hornets': 'Delaware State',
      'Florida A&M Rattlers': 'Florida A&M',
      'Hampton Pirates': 'Hampton',
      'Howard Bison': 'Howard',
      'Morgan State Bears': 'Morgan State',
      'Norfolk State Spartans': 'Norfolk State',
      'North Carolina A&T Aggies': 'North Carolina A&T',
      'NC Central Eagles': 'NC Central',
      'Savannah State Tigers': 'Savannah State',
      'South Carolina State Bulldogs': 'South Carolina State',
      'Illinois State Redbirds': 'Illinois State',
      'Indiana State Sycamores': 'Indiana State',
      'Missouri State Bears': 'Missouri State',
      'North Dakota State Bison': 'North Dakota State',
      'Northern Iowa Panthers': 'Northern Iowa',
      'South Dakota Coyotes': 'South Dakota',
      'South Dakota State Jackrabbits': 'South Dakota State',
      'Southern Illinois Salukis': 'Southern Illinois',
      'Western Illinois Leathernecks': 'Western Illinois',
      'Youngstown State Penguins': 'Youngstown State',
      'Bryant Bulldogs': 'Bryant',
      'Central Connecticut Blue Devils': 'Central Connecticut',
      'Duquesne Dukes': 'Duquesne',
      'Robert Morris (PA) Colonials': 'Robert Morris (PA)',
      'Sacred Heart Pioneers': 'Sacred Heart',
      'St. Francis (PA) Red Flash': 'St. Francis (PA)',
      'Wagner Seahawks': 'Wagner',
      'Austin Peay Governors': 'Austin Peay',
      'Eastern Illinois Panthers': 'Eastern Illinois',
      'Eastern Kentucky Colonels': 'Eastern Kentucky',
      'Jacksonville State Gamecocks': 'Jacksonville State',
      'Murray State Racers': 'Murray State',
      'Southeast Missouri Redhawks': 'Southeast Missouri',
      'Tennessee State Tigers': 'Tennessee State',
      'Tennessee Tech Golden Eagles': 'Tennessee Tech',
      'Tennessee-Martin Skyhawks': 'Tennessee-Martin',
      'Bucknell Bison': 'Bucknell',
      'Colgate Raiders': 'Colgate',
      'Fordham Rams': 'Fordham',
      'Georgetown Hoyas': 'Georgetown',
      'Holy Cross Crusaders': 'Holy Cross',
      'Lafayette Leopards': 'Lafayette',
      'Lehigh Mountain Hawks': 'Lehigh',
      'Butler Bulldogs': 'Butler',
      'Campbell Fighting Camels': 'Campbell',
      'Davidson Wildcats': 'Davidson',
      'Dayton Flyers': 'Dayton',
      'Drake Bulldogs': 'Drake',
      'Jacksonville Dolphins': 'Jacksonville',
      'Marist Red Foxes': 'Marist',
      'Morehead State Eagles': 'Morehead State',
      'San Diego Toreros': 'San Diego',
      'Stetson Hatters': 'Stetson',
      'Valparaiso Beacons': 'Valparaiso',
      'Chattanooga Mocs': 'Chattanooga',
      'ETSU Buccaneers': 'ETSU',
      'Furman Paladins': 'Furman',
      'Mercer Bears': 'Mercer',
      'Samford Bulldogs': 'Samford',
      'The Citadel Bulldogs': 'The Citadel',
      'VMI Keydets': 'VMI',
      'Western Carolina Catamounts': 'Western Carolina',
      'Wofford Terriers': 'Wofford',
      'Abilene Christian Wildcats': 'Abilene Christian',
      'Central Arkansas Bears': 'Central Arkansas',
      'Houston Baptist Huskies': 'Houston Baptist',
      'Incarnate Word Cardinals': 'Incarnate Word',
      'Lamar Cardinals': 'Lamar',
      'McNeese State Cowboys': 'McNeese State',
      'Nicholls State Colonels': 'Nicholls State',
      'Northwestern State Demons': 'Northwestern State',
      'Sam Houston State Bearkats': 'Sam Houston State',
      'Southeastern Louisiana Lions': 'Southeastern Louisiana',
      'Stephen F. Austin Lumberjacks': 'Stephen F. Austin',
      'Alabama A&M Bulldogs': 'Alabama A&M',
      'Alabama State Hornets': 'Alabama State',
      'Alcorn State Braves': 'Alcorn State',
      'Arkansas-Pine Bluff Golden Lions': 'Arkansas-Pine Bluff',
      'Grambling State Tigers': 'Grambling State',
      'Jackson State Tigers': 'Jackson State',
      'Mississippi Valley State Delta Devils': 'Mississippi Valley State',
      'Prairie View A&M Panthers': 'Prairie View A&M',
      'Southern University Jaguars': 'Southern University',
      'Texas Southern Tigers': 'Texas Southern',
      'Wichita State Shockers': 'Wichita State',
      'Winthrop Eagles': 'Winthrop',
      'Green Bay Phoenix': 'Green Bay',
      'Milwaukee Panthers': 'Milwaukee',
      'Wright State Raiders': 'Wright State',
      'Xavier Musketeers': 'Xavier',
      'Kansas City Roos': 'Kansas City',
      "Mount St. Mary's Mountaineers": "Mount St. Mary's",
      'Omaha Mavericks': 'Omaha',
      'NJIT Highlanders': 'NJIT',
      'New Orleans Privateers': 'New Orleans',
      'Niagara Purple Eagles': 'Niagara',
      'UNC Asheville Bulldogs': 'UNC Asheville',
      'UNC Greensboro Spartans': 'UNC Greensboro',
      'UNC Wilmington Seahawks': 'UNC Wilmington',
      'North Florida Ospreys': 'North Florida',
      'Northeastern Huskies': 'Northeastern',
      'Northern Kentucky Norse': 'Northern Kentucky',
      'Oakland Golden Grizzlies': 'Oakland',
      'Oral Roberts Golden Eagles': 'Oral Roberts',
      'Pacific Tigers': 'Pacific',
      'Pepperdine Waves': 'Pepperdine',
      'Portland Pilots': 'Portland',
      'Providence Friars': 'Providence',
      'Purdue Fort Wayne Mastodons': 'Purdue Fort Wayne',
      'Quinnipiac Bobcats': 'Quinnipiac',
      'Radford Highlanders': 'Radford',
      'Rider Broncs': 'Rider',
      'St. Bonaventure Bonnies': 'St. Bonaventure',
      'St. Francis Brooklyn Terriers': 'St. Francis Brooklyn',
      "St. John's Red Storm": "St. John's",
      "Saint Joseph's Hawks": "Saint Joseph's",
      'Saint Louis Billikens': 'Saint Louis',
      "Saint Mary's Gaels": "Saint Mary's",
      "Saint Peter's Peacocks": "Saint Peter's",
      'San Francisco Dons': 'San Francisco',
      'Santa Clara Broncos': 'Santa Clara',
      'Seattle Redhawks': 'Seattle',
      'Seton Hall Pirates': 'Seton Hall',
      'Siena Saints': 'Siena',
      'USC Upstate Spartans': 'USC Upstate',
      'Southern Jaguars': 'Southern',
      'SIU Edwardsville Cougars': 'SIU Edwardsville',
      'Texas A&M-Corpus Christi Islanders': 'Texas A&M-Corpus Christi',
      'UT Arlington Mavericks': 'UT Arlington',
      'UTRGV Vaqueros': 'UTRGV',
      'Utah Valley Wolverines': 'Utah Valley',
      'Vermont Catamounts': 'Vermont',
      'VCU Rams': 'VCU',
      'UAB Blazers': 'UAB',
      'American Eagles': 'American',
      'Little Rock Trojans': 'Little Rock',
      'Belmont Bruins': 'Belmont',
      'Binghamton Bearcats': 'Binghamton',
      'Boston University Terriers': 'Boston University',
      'Bradley Braves': 'Bradley',
      'UC Irvine Anteaters': 'UC Irvine',
      'UC Riverside Highlanders': 'UC Riverside',
      'UC Santa Barbara Gauchos': 'UC Santa Barbara',
      'Cal State Bakersfield Roadrunners': 'Cal State Bakersfield',
      'Cal State Fullerton Titans': 'Cal State Fullerton',
      'Long Beach State The Beach': 'Long Beach State',
      'Cal State Northridge Matadors': 'Cal State Northridge',
      'Canisius Golden Griffins': 'Canisius',
      'College of Charleston Cougars': 'College of Charleston',
      'Chicago State Cougars': 'Chicago State',
      'Cleveland State Vikings': 'Cleveland State',
      'Coppin State Eagles': 'Coppin State',
      'Creighton Bluejays': 'Creighton',
      'Denver Pioneers': 'Denver',
      'DePaul Blue Demons': 'DePaul',
      'Detroit Titans': 'Detroit',
      'Drexel Dragons': 'Drexel',
      'Evansville Purple Aces': 'Evansville',
      'Fairfield Stags': 'Fairfield',
      'Fairleigh Dickinson Knights': 'Fairleigh Dickinson',
      'FGCU Eagles': 'FGCU',
      'George Mason Patriots': 'George Mason',
      'George Washington Colonials': 'George Washington',
      'Gonzaga Bulldogs': 'Gonzaga',
      'Grand Canyon Antelopes': 'Grand Canyon',
      'Hartford Hawks': 'Hartford',
      'High Point Panthers': 'High Point',
      'Hofstra Pride': 'Hofstra',
      'UIC Flames': 'UIC',
      'IUPUI Jaguars': 'IUPUI',
      'Iona Gaels': 'Iona',
      'La Salle Explorers': 'La Salle',
      'Lipscomb Bisons': 'Lipscomb',
      'LIU Sharks': 'LIU',
      'Longwood Lancers': 'Longwood',
      'Loyola Chicago Ramblers': 'Loyola Chicago',
      'Loyola (MD) Greyhounds': 'Loyola (MD)',
      'Loyola Marymount Lions': 'Loyola Marymount',
      'Manhattan Jaspers': 'Manhattan',
      'Marquette Golden Eagles': 'Marquette',
      'UMBC Retrievers': 'UMBC',
      'Maryland Eastern Shore Hawks': 'Maryland Eastern Shore',
      'UMass Lowell River Hawks': 'UMass Lowell',
      // MLB
      'Arizona Diamondbacks': 'ARI',
      'Atlanta Braves': 'ATL',
      'Baltimore Orioles': 'BAL',
      'Boston Red Sox': 'BOS',
      'Chicago White Sox': 'CWS',
      'Chicago Cubs': 'CHC',
      'Cincinnati Reds': 'CIN',
      'Cleveland Guardians': 'CLE',
      'Colorado Rockies': 'COL',
      'Detroit Tigers': 'DET',
      'Houston Astros': 'HOU',
      'Kansas City Royals': 'KC',
      'Los Angeles Angels': 'ANA',
      'Los Angeles Dodgers': 'LA',
      'Miami Marlins': 'MIA',
      'Milwaukee Brewers': 'MIL',
      'Minnesota Twins': 'MIN',
      'New York Mets': 'NYM',
      'New York Yankees': 'NYY',
      'Oakland Athletics': 'OAK',
      'Philadelphia Phillies': 'PHI',
      'Pittsburgh Pirates': 'PIT',
      'San Diego Padres': 'SD',
      'San Francisco Giants': 'SF',
      'Seattle Mariners': 'SEA',
      'St. Louis Cardinals': 'STL',
      'Tampa Bay Rays': 'TB',
      'Texas Rangers': 'TEX',
      'Toronto Blue Jays': 'TOR',
      'Washington Nationals': 'WAS',
      // NHL
      'Anaheim Ducks': 'ANA',
      'Buffalo Sabres': 'BUF',
      'Boston Bruins': 'BOS',
      'Arizona Coyotes': 'ARI',
      'Colorado Avalanche': 'COL',
      'Chicago Blackhawks': 'CHI',
      'Dallas Stars': 'DAL',
      'Carolina Hurricanes': 'CAR',
      'Edmonton Oilers': 'EDM',
      'Minnesota Wild': 'MIN',
      'Detroit Red Wings': 'DET',
      'Columbus Blue Jackets': 'CBJ',
      'Los Angeles Kings': 'LAK',
      'New Jersey Devils': 'NJD',
      'New York Rangers': 'NYR',
      'New York Islanders': 'NYI',
      'Calgary Flames': 'CGY',
      'Ottawa Senators': 'OTT',
      'Montréal Canadiens': 'MTL',
      'Philadelphia Flyers': 'PHI',
      'Pittsburgh Penguins': 'PIT',
      'San Jose Sharks': 'SJS',
      'Florida Panthers': 'FLA',
      'Nashville Predators': 'NSH',
      'Tampa Bay Lightning': 'TBL',
      'Toronto Maple Leafs': 'TOR',
      'St Louis Blues': 'STL',
      'Vancouver Canucks': 'VAN',
      'Vegas Golden Knights': 'VGK',
      'Washington Capitals': 'WSH',
      'Winnipeg Jets': 'WPG',
      'Seattle Kraken': 'SEA',
    };

    return teamsTable[x] || x;
  };

  const lineSyntax = point => {
    if (!point) {
      return '';
    } else if (point <= 0) {
      return point + ' ';
    } else {
      return '+' + point + ' ';
    }
  };

  const awayTeamFilter = outcomes => {
    const away_team = Constants.awayTeam;
    const awayTeamDisplayed = outcomes.filter(
      outcome => outcome.name == away_team
    );

    return awayTeamDisplayed;
  };

  const homeTeamOutcome = outcomes => {
    return outcomes[1];
  };

  const oddsNFL = x => {
    return x[0] === 'americanfootball_nfl';
  };

  const oddsNBA = x => {
    return x[0] === 'basketball_nba';
  };

  const oddsNCAAF = x => {
    return x[0] === 'americanfootball_ncaaf';
  };

  const oddsNCAAB = x => {
    return x[0] === 'basketball_ncaab';
  };

  const oddsMLB = x => {
    return x[0] === 'baseball_mlb';
  };

  const oddsNHL = x => {
    return x[0] === 'icehockey_nhl';
  };

  const oddsMMA = x => {
    return x[0] === 'mma_mixed_martial_arts';
  };

  const oddsSpread = x => {
    return x[1] === 'spreads';
  };

  const oddsTotal = x => {
    return x[1] === 'totals';
  };

  const oddsMoneyline = x => {
    return x[1] === 'h2h';
  };

  const oddsFutures = x => {
    return x[1] === 'outrights';
  };

  const getLeague = x => {
    return x[0];
  };

  const getBetType = x => {
    return x[1];
  };

  const oddsChangeBetType = x => {
    //Constants.oddsDisplayed[1] = x;
    //return [Constants.oddsDisplayed[0],x];

    Constants.oddsDisplayedDevice[1] = x;
    return [Constants.oddsDisplayedDevice[0], x];
  };

  const oddsAmericanMoneylineSyntax = oddsAmerican => {
    if (!oddsAmerican) {
      return '-';
    } else if (oddsAmerican < 0) {
      return oddsAmerican;
    } else {
      return '+' + oddsAmerican;
    }
  };

  const typeTotalCompare = x => {
    return x === 'totals';
  };

  const typeSpreadCompare = x => {
    return x === 'spreads';
  };

  const typeMoneylineCompare = x => {
    return x === 'h2h';
  };

  const typeFuturesCompare = x => {
    return x === 'outrights';
  };

  const isLive = commence_time => {
    const date = new Date(commence_time);
    const now = new Date();

    return now.getTime() > date.getTime() ? true : false;

    /*if(now.getTime() > date.getTime()){  //this line and 2 lines below
return true;
} else {
let str = month[date.getMonth()] + " " + date.getDate() + ", "
if(date.getHours() >= 12){
  if(date.getHours() == 12){
    str = str + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "p"
  }else{
    str = str + (date.getHours() - 12) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "p"
  }
}else{
  if(date.getHours() == 0){
    str = str + (date.getHours() + 12) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "a"
  }else{
    str = str + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + "a"
  }
}
return str
};*/
  };

  const teamNameShorten = x => {
    if (x.length > 5) {
      return x.substring(0, 5) + '...';
    } else {
      return x;
    }
  };

  const totalOverSyntax = x => {
    return 'o' + x + ' ';
  };

  const totalUnderSyntax = x => {
    return 'u' + x + ' ';
  };

  const findBestLine = odds => {
    /*let exist = false;

for (x = 0; x < odds.bookmakers.length; x++){

}



Math.max()

function loopDate() {
    let exist = false;
    let d = new Date();
    for (let x = 0; x < betslips.bets.length; x++){
        if (betslips.bets[x].event === null || betslips.bets[x].event.league === null) {
            exist;
        } else if (Constants.filterDateApply.includes('sevenDays')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - 7));
        } else if (Constants.filterDateApply.includes('twentyEightDays')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - 28));
        } else if (Constants.filterDateApply.includes('threeMonths')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - 90));
        } else if (Constants.filterDateApply.includes('sixMonths')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - 180));
        } else if (Constants.filterDateApply.includes('yearToDate')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - getYTD()));
        } else if (Constants.filterDateApply.includes('twelveMonths')) {
            exist = new Date(betslips.bets[x].event.startTime) >= (d.setDate(d.getDate() - 365));
        } else {
            exist;
        };
    };
    return exist;
};

*/
  };

  const filterList = list => {
    console.log(list, textInputValue);

    newList = list.filter(
      item =>
        item.awayTeam.includes(textInputValue) ||
        item.homeTeam.includes(textInputValue) ||
        item.awayTeam.toLowerCase().includes(textInputValue) ||
        item.homeTeam.toLowerCase().includes(textInputValue)
    );

    return newList;
  };

  const setSearchEmpty = () => {
    Constants.textInputValue = '';
  };

  const emptySearchBar = () => {
    setTextInputValue('');
  };

  const checkAwayTeamWinning = () => {
    if (parseInt(Constants.awayScore) > parseInt(Constants.homeScore)) {
      return true;
    } else if (parseInt(Constants.awayScore) < parseInt(Constants.homeScore)) {
      return false;
    } else {
      return null;
    }
  };

  const betMgmAwayLine = x => {
    if (!x[2].awayTeamLine) {
      line = '';
    } else if (x[2].awayTeamLine < 0) {
      line = x[2].awayTeamLine + ' ';
    } else {
      line = '+' + x[2].awayTeamLine + ' ';
    }

    if (!x[2].awayTeamOddsAmerican) {
      odds = '';
    } else if (!x[2].awayTeamLine && x[2].awayTeamOddsAmerican < 0) {
      odds = x[2].awayTeamOddsAmerican;
    } else if (!x[2].awayTeamLine && x[2].awayTeamOddsAmerican >= 0) {
      odds = '+' + x[2].awayTeamOddsAmerican;
    } else if (x[2].awayTeamOddsAmerican < 0) {
      odds = '(' + x[2].awayTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[2].awayTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const betMgmHomeLine = x => {
    if (!x[2].homeTeamLine) {
      line = '';
    } else if (x[2].homeTeamLine < 0) {
      line = x[2].homeTeamLine + ' ';
    } else {
      line = '+' + x[2].homeTeamLine + ' ';
    }

    if (!x[2].homeTeamOddsAmerican) {
      odds = '';
    } else if (!x[2].homeTeamLine && x[2].homeTeamOddsAmerican < 0) {
      odds = x[2].homeTeamOddsAmerican;
    } else if (!x[2].homeTeamLine && x[2].homeTeamOddsAmerican >= 0) {
      odds = '+' + x[2].homeTeamOddsAmerican;
    } else if (x[2].homeTeamOddsAmerican < 0) {
      odds = '(' + x[2].homeTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[2].homeTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const unibetHomeLine = x => {
    if (!x[5].homeTeamLine) {
      line = '';
    } else if (x[5].homeTeamLine < 0) {
      line = x[5].homeTeamLine + ' ';
    } else {
      line = '+' + x[5].homeTeamLine + ' ';
    }

    if (!x[5].homeTeamOddsAmerican) {
      odds = '';
    } else if (!x[5].homeTeamLine && x[5].homeTeamOddsAmerican < 0) {
      odds = x[5].homeTeamOddsAmerican;
    } else if (!x[5].homeTeamLine && x[5].homeTeamOddsAmerican >= 0) {
      odds = '+' + x[5].homeTeamOddsAmerican;
    } else if (x[5].homeTeamOddsAmerican < 0) {
      odds = '(' + x[5].homeTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[5].homeTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const unibetAwayLine = x => {
    if (!x[5].awayTeamLine) {
      line = '';
    } else if (x[5].awayTeamLine < 0) {
      line = x[5].awayTeamLine + ' ';
    } else {
      line = '+' + x[5].awayTeamLine + ' ';
    }

    if (!x[5].awayTeamOddsAmerican) {
      odds = '';
    } else if (!x[5].awayTeamLine && x[5].awayTeamOddsAmerican < 0) {
      odds = x[5].awayTeamOddsAmerican;
    } else if (!x[5].awayTeamLine && x[5].awayTeamOddsAmerican >= 0) {
      odds = '+' + x[5].awayTeamOddsAmerican;
    } else if (x[5].awayTeamOddsAmerican < 0) {
      odds = '(' + x[5].awayTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[5].awayTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const betRiversAwayLine = x => {
    if (!x[4].awayTeamLine) {
      line = '';
    } else if (x[4].awayTeamLine < 0) {
      line = x[4].awayTeamLine + ' ';
    } else {
      line = '+' + x[4].awayTeamLine + ' ';
    }

    if (!x[4].awayTeamOddsAmerican) {
      odds = '';
    } else if (!x[4].awayTeamLine && x[4].awayTeamOddsAmerican < 0) {
      odds = x[4].awayTeamOddsAmerican;
    } else if (!x[4].awayTeamLine && x[4].awayTeamOddsAmerican >= 0) {
      odds = '+' + x[4].awayTeamOddsAmerican;
    } else if (x[4].awayTeamOddsAmerican < 0) {
      odds = '(' + x[4].awayTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[4].awayTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const betRiversHomeLine = x => {
    if (!x[4].homeTeamLine) {
      line = '';
    } else if (x[4].homeTeamLine < 0) {
      line = x[4].homeTeamLine + ' ';
    } else {
      line = '+' + x[4].homeTeamLine + ' ';
    }

    if (!x[4].homeTeamOddsAmerican) {
      odds = '';
    } else if (!x[4].homeTeamLine && x[4].homeTeamOddsAmerican < 0) {
      odds = x[4].homeTeamOddsAmerican;
    } else if (!x[4].homeTeamLine && x[4].homeTeamOddsAmerican >= 0) {
      odds = '+' + x[4].homeTeamOddsAmerican;
    } else if (x[4].homeTeamOddsAmerican < 0) {
      odds = '(' + x[4].homeTeamOddsAmerican + ')';
    } else {
      odds = '(+' + x[4].homeTeamOddsAmerican + ')';
    }

    return line + odds;
  };

  const configureArray = x => {
    return [x];
  };

  const bookmakerBetMGM = x => {
    return [x[2]];
  };

  const bookmakerUnibet = x => {
    return [x[5]];
  };

  const bookmakerBetRivers = x => {
    return [x[4]];
  };

  const testFunction = x => {
    return x[2].awayTeamLine <= 0
      ? x[2].awayTeamLine + ' '
      : '+' + x[2].awayTeamLine + ' ';
  };

  const winningAwayTeam = x => {
    return x === 2;
  };

  const winningHomeTeam = x => {
    return x === 1;
  };

  const firstCharacter = x => {
    return x == null ? '' : x.charAt(0);
  };

  const scoreZero = x => {
    if (x !== null) {
      return true;
    }
  };

  const tutorialScreenCounter1 = x => {
    return x == 1 ? true : false;
  };

  const tutorialScreenCounter2 = x => {
    return x == 2 ? true : false;
  };

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      segmentLogScreen(segment, 'Games');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [awayLineBetMGM, setAwayLineBetMGM] = React.useState('');
  const [awayTeam, setAwayTeam] = React.useState('');
  const [dummy, setDummy] = React.useState(0);
  const [dummyTwo, setDummyTwo] = React.useState(1);
  const [homeLineBetMGM, setHomeLineBetMGM] = React.useState('');
  const [homeTeam, setHomeTeam] = React.useState('');
  const [selectedSportsbook, setSelectedSportsbook] = React.useState('');
  const [selectedSportsbookAffiliateUrl, setSelectedSportsbookAffiliateUrl] =
    React.useState('');
  const [selectedSportsbookOffer, setSelectedSportsbookOffer] =
    React.useState('');
  const [selectedSportsbookUrl, setSelectedSportsbookUrl] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('');
  const [selectedTeamLine, setSelectedTeamLine] = React.useState(0);
  const [selectedTeamOddsAmerican, setSelectedTeamOddsAmerican] =
    React.useState(0);
  const [startTime, setStartTime] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasTopSafeArea={true}
      hasSafeArea={false}
    >
      <Surface
        style={StyleSheet.applyWidth(
          { backgroundColor: theme.colors.background, borderRadius: 0 },
          dimensions.width
        )}
        elevation={3}
      >
        {/* Menu Bar */}
        <View
          style={StyleSheet.applyWidth(
            { borderRadius: 0, justifyContent: 'center' },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            {/* Left Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  borderRadius: 0,
                  justifyContent: 'center',
                  width: '33%',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'toggleMenuModal',
                      value: true,
                    });
                    setGlobalVariableValue({
                      key: 'profileCardSettings',
                      value: false,
                    });
                    segmentLogTrack(
                      segment,
                      'Menu opened',
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 50,
                      paddingLeft: 16,
                      paddingRight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Menu */}
                  <Icon
                    name={'Ionicons/ios-menu'}
                    size={28}
                    color={theme.colors.lightLowImportanceText}
                  />
                </View>
              </Touchable>
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              {/* Vault Logo */}
              <>
                {!Constants['showVaultLogo'] ? null : (
                  <Image
                    style={StyleSheet.applyWidth(
                      { height: 50, width: 115 },
                      dimensions.width
                    )}
                    source={Images.VaultLogoLightFontClearBackground}
                    resizeMode={'contain'}
                  />
                )}
              </>
            </View>
            {/* Right Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
                  borderRadius: 0,
                  height: 50,
                  justifyContent: 'center',
                  width: '33%',
                },
                dimensions.width
              )}
            ></View>
          </View>
        </View>
      </Surface>

      <ScrollView
        showsVerticalScrollIndicator={true}
        bounces={true}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={StyleSheet.applyWidth(
            { backgroundColor: theme.colors.background, height: 10 },
            dimensions.width
          )}
        />
        <View>
          {/* League Selector Scroll View */}
          <ScrollView
            contentContainerStyle={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 8 },
              dimensions.width
            )}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
          >
            {/* NFL Touchable_Off */}
            <>
              {oddsNFL(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('americanfootball_nfl'),
                      });
                      segmentLogTrack(
                        segment,
                        'NFL Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NflLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NFL'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NFL Touchable_On */}
            <>
              {!oddsNFL(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NflLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NFL'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NCAAF Touchable_Off */}
            <>
              {oddsNCAAF(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('americanfootball_ncaaf'),
                      });
                      segmentLogTrack(
                        segment,
                        'NCAAF Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NcaafLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NCAAF'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NCAAF Touchable_On */}
            <>
              {!oddsNCAAF(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NcaafLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NCAAF'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NBA Touchable_Off */}
            <>
              {oddsNBA(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('basketball_nba'),
                      });
                      segmentLogTrack(
                        segment,
                        'NBA Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NbaLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NBA'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NBA Touchable_On */}
            <>
              {!oddsNBA(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NbaLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NBA'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NCAAB Touchable_Off */}
            <>
              {oddsNCAAB(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('basketball_ncaab'),
                      });
                      segmentLogTrack(
                        segment,
                        'NCAAB Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NcaambLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NCAAB'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NCAAB Touchable_On */}
            <>
              {!oddsNCAAB(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NcaambLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NCAAB'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* MLB Touchable_Off */}
            <>
              {oddsMLB(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('baseball_mlb'),
                      });
                      segmentLogTrack(
                        segment,
                        'MLB Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.MlbLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'MLB'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* MLB Touchable_On */}
            <>
              {!oddsMLB(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.MlbLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'MLB'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NHL Touchable_Off */}
            <>
              {oddsNHL(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('icehockey_nhl'),
                      });
                      segmentLogTrack(
                        segment,
                        'NHL Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NhlLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NHL'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* NHL Touchable_On */}
            <>
              {!oddsNHL(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.NhlLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'NHL'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* UFC Touchable_Off */}
            <>
              {oddsMMA(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'oddsDisplayedDevice',
                        value: oddsChangeLeague('mma_mixed_martial_arts'),
                      });
                      segmentLogTrack(
                        segment,
                        'UFC Games Selected',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderColor:
                            theme.colors['Background Inverse (Main Font)'],
                          borderRadius: 22,
                          borderWidth: 1,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.UfcLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'UFC'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* UFC Touchable_On */}
            <>
              {!oddsMMA(Constants['oddsDisplayedDevice']) ? null : (
                <Touchable
                  style={StyleSheet.applyWidth(
                    { marginRight: 8 },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['Primary'],
                          borderRadius: 22,
                          height: 44,
                          justifyContent: 'center',
                          width: 44,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={Images.UfcLogo}
                      />
                    </View>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color: theme.colors['Primary'],
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '700',
                            marginTop: 3,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'UFC'}
                    </Text>
                  </View>
                </Touchable>
              )}
            </>
            {/* Blog Touchable */}
            <Touchable
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'toggleLeaguesModal',
                    value: true,
                  });
                  segmentLogTrack(
                    segment,
                    'Blog Opened',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginRight: 8 },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor:
                        theme.colors['Background Inverse (Main Font)'],
                      borderRadius: 22,
                      borderWidth: 1,
                      height: 44,
                      justifyContent: 'center',
                      width: 44,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    name={'Ionicons/newspaper'}
                    size={25}
                    color={theme.colors['Background Inverse (Main Font)']}
                  />
                </View>

                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Background Inverse (Main Font)'],
                      fontFamily: 'System',
                      fontSize: 10,
                      fontWeight: '700',
                      marginTop: 3,
                    }),
                    dimensions.width
                  )}
                >
                  {'Blog'}
                </Text>
              </View>
            </Touchable>
          </ScrollView>
          {/* Promo Scroll View */}
          <ScrollView
            contentContainerStyle={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 4, paddingTop: 16 },
              dimensions.width
            )}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
          >
            <Touchable
              onPress={() => {
                try {
                  Linking.openURL(
                    'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1694029'
                  );
                  segmentLogTrack(
                    segment,
                    'BetMGM promo clicked',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginRight: 12 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 135, width: 270 },
                    dimensions.width
                  )}
                  resizeMode={'contain'}
                  source={Images.BetMGMPromoA}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                try {
                  Linking.openURL(
                    'https://app.prizepicks.com/sign-up?invite_code=VAULT'
                  );
                  segmentLogTrack(
                    segment,
                    'PrizePicks promo clicked',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginRight: 12 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 135, width: 270 },
                    dimensions.width
                  )}
                  resizeMode={'contain'}
                  source={Images.PrizePicksPromoA}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                try {
                  Linking.openURL(
                    'https://record.pointsbetpartners.com/_ZvdkqjISoXENTExyHzZxqWNd7ZgqdRLk/125/?promo=500XL18'
                  );
                  segmentLogTrack(
                    segment,
                    'PointsBet promo clicked',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginRight: 12 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 135, width: 270 },
                    dimensions.width
                  )}
                  resizeMode={'contain'}
                  source={Images.PointsBetPromoA}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                try {
                  Linking.openURL('https://play.underdogfantasy.com/p-vault');
                  segmentLogTrack(
                    segment,
                    'Underdog Fantasy promo clicked',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginRight: 12 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 135, width: 270 },
                    dimensions.width
                  )}
                  source={Images.UnderdogFantasyPromoA}
                  resizeMode={'contain'}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={() => {
                try {
                  Linking.openURL('https://www.vaultsportshq.com/betrivers');
                  segmentLogTrack(
                    segment,
                    'BetRivers promo clicked',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 8, marginRight: 12 },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 135, width: 270 },
                    dimensions.width
                  )}
                  resizeMode={'contain'}
                  source={Images.BetRiversPromoA}
                />
              </View>
            </Touchable>
          </ScrollView>
          {/* Title */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 28,
                paddingLeft: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row' },
                dimensions.width
              )}
            >
              {/* Spread */}
              <>
                {!oddsSpread(Constants['oddsDisplayedDevice']) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Spread'}
                    </Text>
                  </View>
                )}
              </>
              {/* Spread */}
              <>
                {oddsSpread(Constants['oddsDisplayedDevice']) ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'oddsDisplayedDevice',
                          value: oddsChangeBetType('spreads'),
                        });
                        segmentLogTrack(
                          segment,
                          'Spread odds clicked',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.divider,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Spread'}
                    </Text>
                  </Touchable>
                )}
              </>
              {/* Total */}
              <>
                {!oddsTotal(Constants['oddsDisplayedDevice']) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Total'}
                    </Text>
                  </View>
                )}
              </>
              {/* Total */}
              <>
                {oddsTotal(Constants['oddsDisplayedDevice']) ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'oddsDisplayedDevice',
                          value: oddsChangeBetType('totals'),
                        });
                        segmentLogTrack(
                          segment,
                          'Total odds clicked',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.divider,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Total'}
                    </Text>
                  </Touchable>
                )}
              </>
              {/* Moneyline */}
              <>
                {!oddsMoneyline(Constants['oddsDisplayedDevice']) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Moneyline'}
                    </Text>
                  </View>
                )}
              </>
              {/* Moneyline */}
              <>
                {oddsMoneyline(Constants['oddsDisplayedDevice']) ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'oddsDisplayedDevice',
                          value: oddsChangeBetType('h2h'),
                        });
                        segmentLogTrack(
                          segment,
                          'Moneyline odds clicked',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginRight: 20 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.divider,
                          fontFamily: 'System',
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        dimensions.width
                      )}
                    >
                      {'Moneyline'}
                    </Text>
                  </Touchable>
                )}
              </>
            </View>

            <View>
              <>
                {Constants['toggleGamesSearchBar'] ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        setGlobalVariableValue({
                          key: 'toggleGamesSearchBar',
                          value: true,
                        });
                        segmentLogTrack(
                          segment,
                          'Search bar opened',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingLeft: 16,
                          paddingRight: 16,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        name={'Ionicons/ios-search'}
                        color={theme.colors.lightLowImportanceText}
                        size={24}
                      />
                    </View>
                  </Touchable>
                )}
              </>
              <>
                {!Constants['toggleGamesSearchBar'] ? null : (
                  <Touchable
                    onPress={() => {
                      try {
                        emptySearchBar();
                        setGlobalVariableValue({
                          key: 'toggleGamesSearchBar',
                          value: false,
                        });
                        segmentLogTrack(
                          segment,
                          'Search bar closed',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingLeft: 16,
                          paddingRight: 16,
                        },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={theme.colors.primary}
                        name={'Ionicons/ios-close'}
                        size={24}
                      />
                    </View>
                  </Touchable>
                )}
              </>
            </View>
          </View>
          {/* Search Bar */}
          <>
            {!Constants['toggleGamesSearchBar'] ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    paddingBottom: 10,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 18,
                  },
                  dimensions.width
                )}
              >
                <TextInput
                  onChangeText={newTextInputValue => {
                    const textInputValue = newTextInputValue;
                    try {
                      setTextInputValue(textInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.divider,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontSize: 16,
                      paddingBottom: 8,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                    },
                    dimensions.width
                  )}
                  value={textInputValue}
                  placeholder={'Search teams...'}
                  placeholderTextColor={theme.colors.lightLowImportanceText}
                  clearButtonMode={'always'}
                  autoCapitalize={'words'}
                  autoFocus={true}
                />
              </View>
            )}
          </>
          <View
            style={StyleSheet.applyWidth({ paddingLeft: 16 }, dimensions.width)}
          >
            <SwaggerAPIApi.FetchOddsDataGET
              betType={getBetType(Constants['oddsDisplayedDevice'])}
              sport={getLeague(Constants['oddsDisplayedDevice'])}
            >
              {({ loading, error, data, refetchOddsData }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <Divider
                      style={StyleSheet.applyWidth(
                        { height: 2, marginLeft: 8, marginTop: 14 },
                        dimensions.width
                      )}
                      color={theme.colors.divider}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, flexDirection: 'row', marginBottom: 100 },
                        dimensions.width
                      )}
                    >
                      <Surface
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: theme.colors.divider,
                            borderRadius: 8,
                          },
                          dimensions.width
                        )}
                        elevation={1}
                      >
                        <FlatList
                          data={filterList(fetchData)}
                          listKey={'6YmN1bjB'}
                          keyExtractor={listData =>
                            listData?.id ||
                            listData?.uuid ||
                            JSON.stringify(listData)
                          }
                          renderItem={({ item }) => {
                            const listData = item;
                            return (
                              <>
                                <Touchable
                                  onPress={() => {
                                    try {
                                      setGlobalVariableValue({
                                        key: 'selectedGame',
                                        value: configureArray(listData),
                                      });
                                      setAwayTeam(listData?.awayTeam);
                                      setHomeTeam(listData?.homeTeam);
                                      setStartTime(listData?.startTime);
                                      setDummyTwo(dummyTwo + 1);
                                      setGlobalVariableValue({
                                        key: 'toggleGameInfoModal',
                                        value: true,
                                      });
                                      console.log(Constants['selectedGame']);
                                      segmentLogTrack(
                                        segment,
                                        'Game clicked',
                                        undefined,
                                        undefined,
                                        listData?.id,
                                        listData?.awayTeam,
                                        undefined,
                                        undefined,
                                        listData?.startTime,
                                        undefined,
                                        listData?.league,
                                        listData?.homeTeam,
                                        undefined,
                                        undefined,
                                        undefined
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        maxWidth: 150,
                                        paddingBottom: 12,
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        paddingTop: 12,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <>
                                      {isLive(listData?.startTime) ? null : (
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors
                                                  .lightLowImportanceText,
                                              fontFamily: 'System',
                                              fontSize: 8,
                                              fontWeight: '400',
                                              marginBottom: 5,
                                            },
                                            dimensions.width
                                          )}
                                          ellipsizeMode={'tail'}
                                          numberOfLines={1}
                                        >
                                          {dateTimeShort(listData?.startTime)}
                                        </Text>
                                      )}
                                    </>
                                    {/* Live */}
                                    <>
                                      {!isLive(listData?.startTime) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'flex-start',
                                              borderRadius: 2,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                backgroundColor:
                                                  theme.colors['Error'],
                                                borderRadius: 2,
                                                justifyContent: 'center',
                                                marginBottom: 5,
                                                paddingLeft: 2,
                                                paddingRight: 2,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Background Inverse (Main Font)'
                                                    ],
                                                  fontSize: 8,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'LIVE'}
                                            </Text>
                                          </View>
                                        </View>
                                      )}
                                    </>
                                    {/* Away Team */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { maxWidth: '75%', paddingRight: 6 },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors
                                                  .backgroundInverseMainFont,
                                              fontFamily: 'System',
                                              fontWeight: '700',
                                            },
                                            dimensions.width
                                          )}
                                          ellipsizeMode={'tail'}
                                          numberOfLines={1}
                                        >
                                          {abbrTeamName(listData?.awayTeam)}
                                        </Text>
                                      </View>
                                      <>
                                        {!scoreZero(
                                          listData?.awayScore
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .backgroundInverseMainFont,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.awayScore}
                                          </Text>
                                        )}
                                      </>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontSize: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'@'}
                                      </Text>
                                    </View>
                                    {/* Home Team */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { maxWidth: 100, paddingRight: 6 },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors
                                                  .backgroundInverseMainFont,
                                              fontFamily: 'System',
                                              fontWeight: '700',
                                            },
                                            dimensions.width
                                          )}
                                          ellipsizeMode={'tail'}
                                          numberOfLines={1}
                                        >
                                          {abbrTeamName(listData?.homeTeam)}
                                        </Text>
                                      </View>
                                      <>
                                        {!scoreZero(
                                          listData?.homeScore
                                        ) ? null : (
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .backgroundInverseMainFont,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.homeScore}
                                          </Text>
                                        )}
                                      </>
                                    </View>
                                  </View>
                                </Touchable>
                                <Divider
                                  style={StyleSheet.applyWidth(
                                    { height: 2 },
                                    dimensions.width
                                  )}
                                  color={theme.colors.background}
                                />
                              </>
                            );
                          }}
                          contentContainerStyle={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                          numColumns={1}
                        />
                      </Surface>
                      {/* Scroll View Horizontal */}
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                      >
                        <FlatList
                          data={filterList(fetchData)}
                          listKey={'MyhplJVw'}
                          keyExtractor={listData =>
                            listData?.id ||
                            listData?.uuid ||
                            JSON.stringify(listData)
                          }
                          renderItem={({ item }) => {
                            const listData = item;
                            return (
                              <>
                                <View
                                  style={StyleSheet.applyWidth(
                                    { paddingBottom: 12 },
                                    dimensions.width
                                  )}
                                >
                                  {/* List_Spread */}
                                  <>
                                    {!typeSpreadCompare(
                                      listData?.betType
                                    ) ? null : (
                                      <FlatList
                                        data={listData?.bookmakers}
                                        listKey={JSON.stringify(
                                          listData?.bookmakers
                                        )}
                                        keyExtractor={listSpreadData =>
                                          listSpreadData?.id ||
                                          listSpreadData?.uuid ||
                                          JSON.stringify(listSpreadData)
                                        }
                                        renderItem={({ item }) => {
                                          const listSpreadData = item;
                                          return (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  width: 115,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors
                                                        .lightLowImportanceText,
                                                    fontFamily: 'System',
                                                    fontSize: 8,
                                                    fontWeight: '600',
                                                    marginBottom: 5,
                                                    marginTop: 12,
                                                  },
                                                  dimensions.width
                                                )}
                                                ellipsizeMode={'clip'}
                                                numberOfLines={1}
                                              >
                                                {listSpreadData?.cleansedTitle}
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam(
                                                      listData?.awayTeam
                                                    );
                                                    setSelectedTeamLine(
                                                      lineSyntax(
                                                        listSpreadData?.awayTeamLine
                                                      )
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanSyntax(
                                                        listSpreadData?.awayTeamOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listSpreadData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listSpreadData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Odds clicked',
                                                      listSpreadData?.awayTeamOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listSpreadData?.cleansedTitle,
                                                      listSpreadData?.awayTeamLine,
                                                      startTime,
                                                      'spread',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      listData?.awayTeam,
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Away_Spread */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors
                                                            .backgroundInverseMainFont,
                                                        fontSize: 14,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {lineSyntax(
                                                      listSpreadData?.awayTeamLine
                                                    )}
                                                    {oddsAmericanSyntax(
                                                      listSpreadData?.awayTeamOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.background,
                                                    fontSize: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'-'}
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam(
                                                      listData?.homeTeam
                                                    );
                                                    setSelectedTeamLine(
                                                      lineSyntax(
                                                        listSpreadData?.homeTeamLine
                                                      )
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanSyntax(
                                                        listSpreadData?.homeTeamOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listSpreadData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listSpreadData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Odds clicked',
                                                      listSpreadData?.homeTeamOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listSpreadData?.cleansedTitle,
                                                      listSpreadData?.homeTeamLine,
                                                      listData?.startTime,
                                                      'spread',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      listData?.homeTeam,
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Home_Spread */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors[
                                                            'Background Inverse (Main Font)'
                                                          ],
                                                        fontSize: 14,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {lineSyntax(
                                                      listSpreadData?.homeTeamLine
                                                    )}
                                                    {oddsAmericanSyntax(
                                                      listSpreadData?.homeTeamOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>
                                            </View>
                                          );
                                        }}
                                        contentContainerStyle={StyleSheet.applyWidth(
                                          { flex: 1 },
                                          dimensions.width
                                        )}
                                        numColumns={1}
                                        horizontal={true}
                                      />
                                    )}
                                  </>
                                  {/* List_Total */}
                                  <>
                                    {!typeTotalCompare(
                                      listData?.betType
                                    ) ? null : (
                                      <FlatList
                                        data={listData?.bookmakers}
                                        listKey={JSON.stringify(
                                          listData?.bookmakers
                                        )}
                                        keyExtractor={listTotalData =>
                                          listTotalData?.id ||
                                          listTotalData?.uuid ||
                                          JSON.stringify(listTotalData)
                                        }
                                        renderItem={({ item }) => {
                                          const listTotalData = item;
                                          return (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  width: 115,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors
                                                        .lightLowImportanceText,
                                                    fontFamily: 'System',
                                                    fontSize: 8,
                                                    fontWeight: '600',
                                                    marginBottom: 5,
                                                    marginTop: 12,
                                                  },
                                                  dimensions.width
                                                )}
                                                ellipsizeMode={'clip'}
                                                numberOfLines={1}
                                              >
                                                {listTotalData?.cleansedTitle}
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam('Over');
                                                    setSelectedTeamLine(
                                                      totalOverSyntax(
                                                        listTotalData?.totalLine
                                                      )
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanSyntax(
                                                        listTotalData?.overOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listTotalData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listTotalData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Odds clicked',
                                                      listTotalData?.overOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listTotalData?.cleansedTitle,
                                                      listTotalData?.totalLine,
                                                      listData?.startTime,
                                                      'total',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      'Over',
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Over_Total */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors
                                                            .backgroundInverseMainFont,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {'o'}
                                                    {
                                                      listTotalData?.totalLine
                                                    }{' '}
                                                    {oddsAmericanSyntax(
                                                      listTotalData?.overOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.background,
                                                    fontSize: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'-'}
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam('Under');
                                                    setSelectedTeamLine(
                                                      totalUnderSyntax(
                                                        listTotalData?.totalLine
                                                      )
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanSyntax(
                                                        listTotalData?.underOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listTotalData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listTotalData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Odds clicked',
                                                      listTotalData?.underOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listTotalData?.cleansedTitle,
                                                      listTotalData?.totalLine,
                                                      listData?.startTime,
                                                      'total',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      'Under',
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Under_Total */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors
                                                            .backgroundInverseMainFont,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {'u'}
                                                    {
                                                      listTotalData?.totalLine
                                                    }{' '}
                                                    {oddsAmericanSyntax(
                                                      listTotalData?.underOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>
                                            </View>
                                          );
                                        }}
                                        contentContainerStyle={StyleSheet.applyWidth(
                                          { flex: 1 },
                                          dimensions.width
                                        )}
                                        numColumns={1}
                                        horizontal={true}
                                      />
                                    )}
                                  </>
                                  {/* List_Moneyline */}
                                  <>
                                    {!typeMoneylineCompare(
                                      listData?.betType
                                    ) ? null : (
                                      <FlatList
                                        data={listData?.bookmakers}
                                        listKey={JSON.stringify(
                                          listData?.bookmakers
                                        )}
                                        keyExtractor={listMoneylineData =>
                                          listMoneylineData?.id ||
                                          listMoneylineData?.uuid ||
                                          JSON.stringify(listMoneylineData)
                                        }
                                        renderItem={({ item }) => {
                                          const listMoneylineData = item;
                                          return (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  width: 100,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors
                                                        .lightLowImportanceText,
                                                    fontFamily: 'System',
                                                    fontSize: 8,
                                                    fontWeight: '600',
                                                    marginBottom: 5,
                                                    marginTop: 12,
                                                  },
                                                  dimensions.width
                                                )}
                                                ellipsizeMode={'clip'}
                                                numberOfLines={1}
                                              >
                                                {
                                                  listMoneylineData?.cleansedTitle
                                                }
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam(
                                                      listData?.awayTeam
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanMoneylineSyntax(
                                                        listMoneylineData?.awayTeamOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listMoneylineData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listMoneylineData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Away moneyline odds clicked',
                                                      listMoneylineData?.awayTeamOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listMoneylineData?.cleansedTitle,
                                                      undefined,
                                                      listData?.startTime,
                                                      'moneyline',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      listData?.awayTeam,
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Away_Moneyline */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors
                                                            .backgroundInverseMainFont,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {oddsAmericanMoneylineSyntax(
                                                      listMoneylineData?.awayTeamOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors.background,
                                                    fontSize: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {'-'}
                                              </Text>

                                              <Touchable
                                                onPress={() => {
                                                  try {
                                                    setSelectedTeam(
                                                      listData?.homeTeam
                                                    );
                                                    setSelectedTeamOddsAmerican(
                                                      oddsAmericanMoneylineSyntax(
                                                        listMoneylineData?.homeTeamOddsAmerican
                                                      )
                                                    );
                                                    setSelectedSportsbook(
                                                      listMoneylineData?.cleansedTitle
                                                    );
                                                    setSelectedSportsbookUrl(
                                                      listMoneylineData?.appUrl
                                                    );
                                                    setGlobalVariableValue({
                                                      key: 'toggleSportsbookModal',
                                                      value: true,
                                                    });
                                                    segmentLogTrack(
                                                      segment,
                                                      'Home moneyline odds clicked',
                                                      listMoneylineData?.homeTeamOddsAmerican,
                                                      undefined,
                                                      listData?.id,
                                                      listData?.awayTeam,
                                                      listMoneylineData?.cleansedTitle,
                                                      undefined,
                                                      listData?.startTime,
                                                      'moneyline',
                                                      listData?.league,
                                                      listData?.homeTeam,
                                                      listData?.homeTeam,
                                                      undefined,
                                                      undefined
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }}
                                              >
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: 'row',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* Home_Moneyline */}
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        color:
                                                          theme.colors
                                                            .backgroundInverseMainFont,
                                                      },
                                                      dimensions.width
                                                    )}
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                  >
                                                    {oddsAmericanMoneylineSyntax(
                                                      listMoneylineData?.homeTeamOddsAmerican
                                                    )}
                                                  </Text>
                                                </View>
                                              </Touchable>
                                            </View>
                                          );
                                        }}
                                        contentContainerStyle={StyleSheet.applyWidth(
                                          { flex: 1 },
                                          dimensions.width
                                        )}
                                        horizontal={true}
                                        numColumns={1}
                                      />
                                    )}
                                  </>
                                </View>
                                <Divider
                                  style={StyleSheet.applyWidth(
                                    { height: 2 },
                                    dimensions.width
                                  )}
                                  color={theme.colors.divider}
                                />
                              </>
                            );
                          }}
                          numColumns={1}
                        />
                      </ScrollView>
                    </View>
                    {/* Sportsbook Modal */}
                    <Modal
                      visible={Constants['toggleSportsbookModal']}
                      animationType={'slide'}
                      transparent={true}
                      presentationStyle={'pageSheet'}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            setGlobalVariableValue({
                              key: 'toggleSportsbookModal',
                              value: false,
                            });
                            setSelectedSportsbookUrl('');
                            setSelectedSportsbook('');
                            setSelectedTeam('');
                            setSelectedTeamLine('');
                            setSelectedTeamOddsAmerican('');
                            segmentLogTrack(
                              segment,
                              'Sportsbook modal closed',
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { height: '65%', width: '100%' },
                          dimensions.width
                        )}
                      />
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: theme.colors.background,
                            borderRadius: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: '35%',
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        <View>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Left Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  borderRadius: 0,
                                  justifyContent: 'center',
                                  width: '25%',
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    setGlobalVariableValue({
                                      key: 'toggleSportsbookModal',
                                      value: false,
                                    });
                                    setSelectedSportsbookUrl('');
                                    setSelectedSportsbook('');
                                    setSelectedTeam('');
                                    setSelectedTeamLine('');
                                    setSelectedTeamOddsAmerican('');
                                    segmentLogTrack(
                                      segment,
                                      'Sportsbook modal closed',
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      height: 50,
                                      paddingRight: 16,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Back */}
                                  <Icon
                                    name={'Ionicons/ios-chevron-back'}
                                    size={32}
                                    color={
                                      theme.colors.backgroundInverseMainFont
                                    }
                                  />
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontSize: 18,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Back'}
                                  </Text>
                                </View>
                              </Touchable>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  height: 50,
                                  justifyContent: 'center',
                                  width: '50%',
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color:
                                      theme.colors.backgroundInverseMainFont,
                                    fontFamily: 'System',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                  },
                                  dimensions.width
                                )}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                              >
                                {selectedTeam}
                              </Text>
                            </View>
                            {/* Right Button */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-end',
                                  borderRadius: 0,
                                  justifyContent: 'center',
                                  paddingRight: 16,
                                  width: '25%',
                                },
                                dimensions.width
                              )}
                            >
                              <Touchable
                                onPress={() => {
                                  try {
                                    Linking.openURL(`${selectedSportsbookUrl}`);
                                    segmentLogTrack(
                                      segment,
                                      'Sportsbook deeplink clicked',
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                {/* DraftKings Logo */}
                                <>
                                  {!compareDraftKings(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.UntitledDesign}
                                    />
                                  )}
                                </>
                                {/* FanDuel Logo */}
                                <>
                                  {!compareFanDuel(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.FanDuelLogo}
                                    />
                                  )}
                                </>
                                {/* BetMGM Logo */}
                                <>
                                  {!compareBetMGM(selectedSportsbook) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.BetMGMLogo}
                                    />
                                  )}
                                </>
                                {/* PointsBet Logo */}
                                <>
                                  {!comparePointsBet(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.PointsBetLogo}
                                    />
                                  )}
                                </>
                                {/* BetRivers Logo */}
                                <>
                                  {!compareBetRivers(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.BetRiversLogo}
                                    />
                                  )}
                                </>
                                {/* Unibet Logo */}
                                <>
                                  {!compareUnibet(selectedSportsbook) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.UnibetLogo}
                                    />
                                  )}
                                </>
                                {/* Barstool Logo */}
                                <>
                                  {!compareBarstool(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.BarstoolLogo}
                                    />
                                  )}
                                </>
                                {/* Fox Bet Logo */}
                                <>
                                  {!compareFoxBet(selectedSportsbook) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.FoxBetLogo}
                                    />
                                  )}
                                </>
                                {/* Caesars Logo */}
                                <>
                                  {!compareCaesars(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.CaesarsLogo}
                                    />
                                  )}
                                </>
                                {/* PrizePicks Logo */}
                                <>
                                  {!comparePrizePicks(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.PrizePicksLogo}
                                    />
                                  )}
                                </>
                                {/* Underdog Logo */}
                                <>
                                  {!compareUnderdog(
                                    selectedSportsbook
                                  ) ? null : (
                                    <Image
                                      style={StyleSheet.applyWidth(
                                        { height: 30, width: 30 },
                                        dimensions.width
                                      )}
                                      resizeMode={'contain'}
                                      source={Images.UnderdogFantasyLogo}
                                    />
                                  )}
                                </>
                              </Touchable>
                            </View>
                          </View>

                          <View
                            style={StyleSheet.applyWidth(
                              {
                                paddingLeft: '4%',
                                paddingRight: '4%',
                                paddingTop: 4,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Sportsbook URL */}
                            <>
                              {!selectedSportsbookUrl ? null : (
                                <Button
                                  onPress={() => {
                                    try {
                                      Linking.openURL(
                                        `${selectedSportsbookUrl}`
                                      );
                                      segmentLogTrack(
                                        segment,
                                        'Sportsbook deeplink clicked',
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined,
                                        undefined
                                      );
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: theme.colors.primary,
                                      borderRadius: 6,
                                      color:
                                        theme.colors.strongTextOnGoldButtons,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                      marginTop: 10,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                  title={`Bet ${selectedTeamLine}${selectedTeamOddsAmerican} on ${selectedSportsbook}`}
                                />
                              )}
                            </>
                            {/* BetMGM Affiliate */}
                            <>
                              {!compareBetMGM(selectedSportsbook) ? null : (
                                <Button
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        await WebBrowser.openBrowserAsync(
                                          'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1666694'
                                        );
                                        segmentLogTrack(
                                          segment,
                                          'BetMGM promo clicked',
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: theme.colors.primary,
                                      borderRadius: 6,
                                      color:
                                        theme.colors.strongTextOnGoldButtons,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                      marginTop: 10,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                  title={'$600 Risk-Free Bet on BetMGM'}
                                />
                              )}
                            </>
                            {/* BetRivers Affiliate */}
                            <>
                              {!compareBetRivers(selectedSportsbook) ? null : (
                                <Button
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        await WebBrowser.openBrowserAsync(
                                          'https://www.vaultsportshq.com/betrivers'
                                        );
                                        segmentLogTrack(
                                          segment,
                                          'BetRivers promo clicked',
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: theme.colors.primary,
                                      borderRadius: 6,
                                      color:
                                        theme.colors.strongTextOnGoldButtons,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                      marginTop: 10,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                  title={'$250 Bonus Match on BetRivers'}
                                />
                              )}
                            </>
                            {/* Unibet Affiliate */}
                            <>
                              {!compareUnibet(selectedSportsbook) ? null : (
                                <Button
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        await WebBrowser.openBrowserAsync(
                                          'https://wlkindred.adsrv.eacdn.com/C.ashx?btag=a_2165b_334c_&affid=76&siteid=2165&adid=334&c=[acid]'
                                        );
                                        segmentLogTrack(
                                          segment,
                                          'Unibet promo clicked',
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: theme.colors.primary,
                                      borderRadius: 6,
                                      color:
                                        theme.colors.strongTextOnGoldButtons,
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                      marginTop: 10,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                  title={'$250 Risk-Free Bet on Unibet'}
                                />
                              )}
                            </>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    {/* Leagues Modal */}
                    <>
                      {!Constants['toggleLeaguesModal'] ? null : (
                        <Modal
                          style={StyleSheet.applyWidth(
                            { backgroundColor: theme.colors.background },
                            dimensions.width
                          )}
                          animationType={'slide'}
                          transparent={true}
                          presentationStyle={'formSheet'}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.background,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                height: '100%',
                                overflow: 'hidden',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Top Bar */}
                            <Surface
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.background,
                                  minHeight: 40,
                                },
                                dimensions.width
                              )}
                              elevation={2}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Left Button */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-start',
                                      borderRadius: 0,
                                      justifyContent: 'center',
                                      width: '33%',
                                    },
                                    dimensions.width
                                  )}
                                ></View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignContent: 'center',
                                      alignItems: 'center',
                                      height: 50,
                                      justifyContent: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color:
                                          theme.colors
                                            .backgroundInverseMainFont,
                                        fontFamily: 'System',
                                        fontSize: 18,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Blog'}
                                  </Text>
                                </View>
                                {/* Right Button */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ViewStyles(theme)[
                                        'Back button View'
                                      ],
                                      { width: '33%' }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setGlobalVariableValue({
                                          key: 'toggleLeaguesModal',
                                          value: false,
                                        });
                                        segmentLogTrack(
                                          segment,
                                          'Blog Closed',
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          height: 50,
                                          justifyContent: 'flex-end',
                                          paddingLeft: 16,
                                          paddingRight: 16,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Close */}
                                      <Icon
                                        color={
                                          theme.colors.lightLowImportanceText
                                        }
                                        name={'Ionicons/ios-close'}
                                        size={32}
                                      />
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                            </Surface>
                            {/* Blog View */}
                            <View>
                              <WebView
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.WebViewStyles(theme)['Web View'],
                                  dimensions.width
                                )}
                                javaScriptEnabled={true}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                cacheEnabled={true}
                                source={{
                                  uri: 'https://www.vaultsportshq.com/resources',
                                }}
                              />
                            </View>
                          </View>
                        </Modal>
                      )}
                    </>
                    {/* Game Info Modal */}
                    <>
                      {!Constants['toggleGameInfoModal'] ? null : (
                        <Modal
                          style={StyleSheet.applyWidth(
                            { backgroundColor: theme.colors.background },
                            dimensions.width
                          )}
                          animationType={'slide'}
                          presentationStyle={'pageSheet'}
                          transparent={true}
                        >
                          <Touchable
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'toggleGameInfoModal',
                                  value: false,
                                });
                                segmentLogTrack(
                                  segment,
                                  'Game info closed',
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={StyleSheet.applyWidth(
                              { height: '25%', width: '100%' },
                              dimensions.width
                            )}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.background,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                height: '75%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Top Bar */}
                            <Surface
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors.background,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  minHeight: 40,
                                },
                                dimensions.width
                              )}
                              elevation={2}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Left Button */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-start',
                                      justifyContent: 'center',
                                      width: '25%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setGlobalVariableValue({
                                          key: 'toggleGameInfoModal',
                                          value: false,
                                        });
                                        segmentLogTrack(
                                          segment,
                                          'Game info closed',
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined,
                                          undefined
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          height: 50,
                                          paddingRight: 16,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon
                                        name={'Ionicons/ios-chevron-back'}
                                        size={32}
                                        color={
                                          theme.colors.backgroundInverseMainFont
                                        }
                                      />
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              theme.colors
                                                .backgroundInverseMainFont,
                                            fontSize: 18,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Back'}
                                      </Text>
                                    </View>
                                  </Touchable>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    { width: '50%' },
                                    dimensions.width
                                  )}
                                >
                                  <FlatList
                                    data={Constants['selectedGame']}
                                    listKey={'59xZTaAJ'}
                                    keyExtractor={listData =>
                                      listData?.id ||
                                      listData?.uuid ||
                                      JSON.stringify(listData)
                                    }
                                    renderItem={({ item }) => {
                                      const listData = item;
                                      return (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              height: 50,
                                              justifyContent: 'center',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              { flex: 1 },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Away Team */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignSelf: 'flex-end',
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 18,
                                                  fontWeight: '700',
                                                },
                                                dimensions.width
                                              )}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                            >
                                              {abbrTeamName(listData?.awayTeam)}
                                            </Text>
                                          </View>

                                          <View>
                                            {/* @ Symbol */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 18,
                                                  fontWeight: '700',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {' @ '}
                                            </Text>
                                          </View>

                                          <View
                                            style={StyleSheet.applyWidth(
                                              { flex: 1 },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Home Team */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignSelf: 'flex-start',
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 18,
                                                  fontWeight: '700',
                                                },
                                                dimensions.width
                                              )}
                                              numberOfLines={1}
                                              ellipsizeMode={'tail'}
                                            >
                                              {abbrTeamName(listData?.homeTeam)}
                                            </Text>
                                          </View>
                                        </View>
                                      );
                                    }}
                                    contentContainerStyle={StyleSheet.applyWidth(
                                      { flex: 1 },
                                      dimensions.width
                                    )}
                                    numColumns={1}
                                  />
                                </View>
                                {/* Right Button */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-end',
                                      justifyContent: 'center',
                                      width: '25%',
                                    },
                                    dimensions.width
                                  )}
                                ></View>
                              </View>
                            </Surface>

                            <View>
                              <FlatList
                                data={Constants['selectedGame']}
                                listKey={'MuU3OzGV'}
                                keyExtractor={listData =>
                                  listData?.id ||
                                  listData?.uuid ||
                                  JSON.stringify(listData)
                                }
                                renderItem={({ item }) => {
                                  const listData = item;
                                  return (
                                    <>
                                      {/* Game Score */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 8,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Away Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              width: '42%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                marginRight: 6,
                                                maxWidth: '55%',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Team Abbr */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Light_low_importance_text'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 28,
                                                  fontWeight: '300',
                                                },
                                                dimensions.width
                                              )}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                            >
                                              {abbrTeamName(listData?.awayTeam)}
                                            </Text>
                                          </View>
                                          {/* Away Score */}
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors[
                                                    'Background Inverse (Main Font)'
                                                  ],
                                                fontFamily: 'System',
                                                fontSize: 28,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.awayScore}
                                          </Text>
                                        </View>
                                        {/* Game Time */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              width: '15%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* Start Time */}
                                          <>
                                            {isLive(
                                              listData?.startTime
                                            ) ? null : (
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      theme.colors
                                                        .backgroundInverseMainFont,
                                                    fontSize: 12,
                                                    textAlign: 'center',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {dateTimeShort(
                                                  listData?.startTime
                                                )}
                                              </Text>
                                            )}
                                          </>
                                          {/* Live */}
                                          <>
                                            {!isLive(
                                              listData?.startTime
                                            ) ? null : (
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    backgroundColor:
                                                      theme.colors['Error'],
                                                    borderRadius: 2,
                                                    justifyContent: 'center',
                                                    paddingLeft: 2,
                                                    paddingRight: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {/* Live */}
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors[
                                                          'Background Inverse (Main Font)'
                                                        ],
                                                      fontFamily: 'System',
                                                      fontSize: 12,
                                                      fontWeight: '400',
                                                      textAlign: 'center',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'LIVE'}
                                                </Text>
                                              </View>
                                            )}
                                          </>
                                        </View>
                                        {/* Home Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              justifyContent: 'flex-end',
                                              width: '42%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* Home Score */}
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors[
                                                    'Background Inverse (Main Font)'
                                                  ],
                                                fontFamily: 'System',
                                                fontSize: 28,
                                                fontWeight: '700',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.homeScore}
                                          </Text>

                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                marginLeft: 6,
                                                maxWidth: '55%',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* Team Abbr */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors[
                                                      'Light_low_importance_text'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 28,
                                                  fontWeight: '300',
                                                },
                                                dimensions.width
                                              )}
                                              ellipsizeMode={'tail'}
                                              numberOfLines={1}
                                            >
                                              {abbrTeamName(listData?.homeTeam)}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                      {/* Full Team Name */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 6,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Away Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'flex-start',
                                              width: '25%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .lightLowImportanceText,
                                                fontFamily: 'System',
                                                fontSize: 10,
                                                fontWeight: '400',
                                                textAlign: 'left',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.awayTeam}
                                          </Text>
                                        </View>
                                        {/* Home Team */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'flex-end',
                                              width: '25%',
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  theme.colors
                                                    .lightLowImportanceText,
                                                fontFamily: 'System',
                                                fontSize: 10,
                                                fontWeight: '400',
                                                textAlign: 'right',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.homeTeam}
                                          </Text>
                                        </View>
                                      </View>
                                      <Divider
                                        style={StyleSheet.applyWidth(
                                          { height: 1, marginTop: 18 },
                                          dimensions.width
                                        )}
                                      />
                                      {/* Odds */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { paddingLeft: '4%' },
                                          dimensions.width
                                        )}
                                      >
                                        <>
                                          {!typeSpreadCompare(
                                            listData?.betType
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 20,
                                                  fontWeight: '700',
                                                  marginTop: 28,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'Spread Odds'}
                                            </Text>
                                          )}
                                        </>
                                        <>
                                          {!typeTotalCompare(
                                            listData?.betType
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 20,
                                                  fontWeight: '700',
                                                  marginTop: 28,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'Total Odds'}
                                            </Text>
                                          )}
                                        </>
                                        <>
                                          {!typeMoneylineCompare(
                                            listData?.betType
                                          ) ? null : (
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                {
                                                  color:
                                                    theme.colors
                                                      .backgroundInverseMainFont,
                                                  fontFamily: 'System',
                                                  fontSize: 20,
                                                  fontWeight: '700',
                                                  marginTop: 28,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {'Moneyline Odds'}
                                            </Text>
                                          )}
                                        </>
                                        <Divider
                                          style={StyleSheet.applyWidth(
                                            {
                                              height: 1,
                                              marginLeft: 6,
                                              marginTop: 10,
                                            },
                                            dimensions.width
                                          )}
                                          color={theme.colors.divider}
                                        />
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { flex: 1, flexDirection: 'row' },
                                            dimensions.width
                                          )}
                                        >
                                          <Surface
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors.divider,
                                                borderRadius: 6,
                                                minHeight: 30,
                                              },
                                              dimensions.width
                                            )}
                                            elevation={1}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  maxWidth: 110,
                                                  paddingBottom: 12,
                                                  paddingLeft: 6,
                                                  paddingRight: 12,
                                                  paddingTop: 12,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: theme.colors.divider,
                                                    fontFamily: 'System',
                                                    fontSize: 8,
                                                    fontWeight: '400',
                                                    marginBottom: 5,
                                                  },
                                                  dimensions.width
                                                )}
                                                ellipsizeMode={'tail'}
                                                numberOfLines={1}
                                              >
                                                {'-'}
                                              </Text>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                  ellipsizeMode={'tail'}
                                                  numberOfLines={1}
                                                >
                                                  {abbrTeamName(
                                                    listData?.awayTeam
                                                  )}
                                                </Text>
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                      'space-between',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontSize: 10,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'@'}
                                                </Text>
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        theme.colors
                                                          .backgroundInverseMainFont,
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                    },
                                                    dimensions.width
                                                  )}
                                                  ellipsizeMode={'tail'}
                                                  numberOfLines={1}
                                                >
                                                  {abbrTeamName(
                                                    listData?.homeTeam
                                                  )}
                                                </Text>
                                              </View>
                                            </View>
                                          </Surface>

                                          <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            bounces={false}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                              false
                                            }
                                          >
                                            <FlatList
                                              data={Constants['selectedGame']}
                                              listKey={JSON.stringify(
                                                Constants['selectedGame']
                                              )}
                                              keyExtractor={listData =>
                                                listData?.id ||
                                                listData?.uuid ||
                                                JSON.stringify(listData)
                                              }
                                              renderItem={({ item }) => {
                                                const listData = item;
                                                return (
                                                  <>
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        { paddingBottom: 12 },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* List_Spread */}
                                                      <>
                                                        {!typeSpreadCompare(
                                                          listData?.betType
                                                        ) ? null : (
                                                          <FlatList
                                                            data={
                                                              listData?.bookmakers
                                                            }
                                                            listKey={JSON.stringify(
                                                              listData?.bookmakers
                                                            )}
                                                            keyExtractor={listSpreadData =>
                                                              listSpreadData?.id ||
                                                              listSpreadData?.uuid ||
                                                              JSON.stringify(
                                                                listSpreadData
                                                              )
                                                            }
                                                            renderItem={({
                                                              item,
                                                            }) => {
                                                              const listSpreadData =
                                                                item;
                                                              return (
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        'center',
                                                                      width: 100,
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .lightLowImportanceText,
                                                                        fontFamily:
                                                                          'System',
                                                                        fontSize: 8,
                                                                        fontWeight:
                                                                          '600',
                                                                        marginBottom: 5,
                                                                        marginTop: 12,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    ellipsizeMode={
                                                                      'clip'
                                                                    }
                                                                    numberOfLines={
                                                                      1
                                                                    }
                                                                  >
                                                                    {
                                                                      listSpreadData?.cleansedTitle
                                                                    }
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          listData?.awayTeam
                                                                        );
                                                                        setSelectedTeamLine(
                                                                          lineSyntax(
                                                                            listSpreadData?.awayTeamLine
                                                                          )
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanSyntax(
                                                                            listSpreadData?.awayTeamOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listSpreadData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listSpreadData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Away Spread Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Away_Spread */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                            fontSize: 14,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                      >
                                                                        {lineSyntax(
                                                                          listSpreadData?.awayTeamLine
                                                                        )}
                                                                        {oddsAmericanSyntax(
                                                                          listSpreadData?.awayTeamOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>

                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .background,
                                                                        fontSize: 10,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                  >
                                                                    {'-'}
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          listData?.homeTeam
                                                                        );
                                                                        setSelectedTeamLine(
                                                                          lineSyntax(
                                                                            listSpreadData?.homeTeamLine
                                                                          )
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanSyntax(
                                                                            listSpreadData?.homeTeamOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listSpreadData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listSpreadData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Home Spread Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Home_Spread */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                            fontSize: 14,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                      >
                                                                        {lineSyntax(
                                                                          listSpreadData?.homeTeamLine
                                                                        )}
                                                                        {oddsAmericanSyntax(
                                                                          listSpreadData?.homeTeamOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>
                                                                </View>
                                                              );
                                                            }}
                                                            contentContainerStyle={StyleSheet.applyWidth(
                                                              { flex: 1 },
                                                              dimensions.width
                                                            )}
                                                            numColumns={1}
                                                            horizontal={true}
                                                          />
                                                        )}
                                                      </>
                                                      {/* List_Total */}
                                                      <>
                                                        {!typeTotalCompare(
                                                          listData?.betType
                                                        ) ? null : (
                                                          <FlatList
                                                            data={
                                                              listData?.bookmakers
                                                            }
                                                            listKey={JSON.stringify(
                                                              listData?.bookmakers
                                                            )}
                                                            keyExtractor={listTotalData =>
                                                              listTotalData?.id ||
                                                              listTotalData?.uuid ||
                                                              JSON.stringify(
                                                                listTotalData
                                                              )
                                                            }
                                                            renderItem={({
                                                              item,
                                                            }) => {
                                                              const listTotalData =
                                                                item;
                                                              return (
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        'center',
                                                                      width: 115,
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .lightLowImportanceText,
                                                                        fontFamily:
                                                                          'System',
                                                                        fontSize: 8,
                                                                        fontWeight:
                                                                          '600',
                                                                        marginBottom: 5,
                                                                        marginTop: 12,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    ellipsizeMode={
                                                                      'clip'
                                                                    }
                                                                    numberOfLines={
                                                                      1
                                                                    }
                                                                  >
                                                                    {
                                                                      listTotalData?.cleansedTitle
                                                                    }
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          'Over'
                                                                        );
                                                                        setSelectedTeamLine(
                                                                          totalOverSyntax(
                                                                            listTotalData?.totalLine
                                                                          )
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanSyntax(
                                                                            listTotalData?.overOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listTotalData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listTotalData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Away Total Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Over_Total */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                      >
                                                                        {'o'}
                                                                        {
                                                                          listTotalData?.totalLine
                                                                        }{' '}
                                                                        {oddsAmericanSyntax(
                                                                          listTotalData?.overOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>

                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .background,
                                                                        fontSize: 10,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                  >
                                                                    {'-'}
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          'Under'
                                                                        );
                                                                        setSelectedTeamLine(
                                                                          totalUnderSyntax(
                                                                            listTotalData?.totalLine
                                                                          )
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanSyntax(
                                                                            listTotalData?.underOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listTotalData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listTotalData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Home Total Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Under_Total */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                      >
                                                                        {'u'}
                                                                        {
                                                                          listTotalData?.totalLine
                                                                        }{' '}
                                                                        {oddsAmericanSyntax(
                                                                          listTotalData?.underOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>
                                                                </View>
                                                              );
                                                            }}
                                                            contentContainerStyle={StyleSheet.applyWidth(
                                                              { flex: 1 },
                                                              dimensions.width
                                                            )}
                                                            numColumns={1}
                                                            horizontal={true}
                                                          />
                                                        )}
                                                      </>
                                                      {/* List_Moneyline */}
                                                      <>
                                                        {!typeMoneylineCompare(
                                                          listData?.betType
                                                        ) ? null : (
                                                          <FlatList
                                                            data={
                                                              listData?.bookmakers
                                                            }
                                                            listKey={JSON.stringify(
                                                              listData?.bookmakers
                                                            )}
                                                            keyExtractor={listMoneylineData =>
                                                              listMoneylineData?.id ||
                                                              listMoneylineData?.uuid ||
                                                              JSON.stringify(
                                                                listMoneylineData
                                                              )
                                                            }
                                                            renderItem={({
                                                              item,
                                                            }) => {
                                                              const listMoneylineData =
                                                                item;
                                                              return (
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        'center',
                                                                      width: 90,
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .lightLowImportanceText,
                                                                        fontFamily:
                                                                          'System',
                                                                        fontSize: 8,
                                                                        fontWeight:
                                                                          '600',
                                                                        marginBottom: 5,
                                                                        marginTop: 12,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    ellipsizeMode={
                                                                      'clip'
                                                                    }
                                                                    numberOfLines={
                                                                      1
                                                                    }
                                                                  >
                                                                    {
                                                                      listMoneylineData?.cleansedTitle
                                                                    }
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          listData?.awayTeam
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanMoneylineSyntax(
                                                                            listMoneylineData?.awayTeamOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listMoneylineData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listMoneylineData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Away Moneyline Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Away_Moneyline */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                      >
                                                                        {oddsAmericanMoneylineSyntax(
                                                                          listMoneylineData?.awayTeamOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>

                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        color:
                                                                          theme
                                                                            .colors
                                                                            .background,
                                                                        fontSize: 10,
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                  >
                                                                    {'-'}
                                                                  </Text>

                                                                  <Touchable
                                                                    onPress={() => {
                                                                      try {
                                                                        setSelectedTeam(
                                                                          listData?.homeTeam
                                                                        );
                                                                        setSelectedTeamOddsAmerican(
                                                                          oddsAmericanMoneylineSyntax(
                                                                            listMoneylineData?.homeTeamOddsAmerican
                                                                          )
                                                                        );
                                                                        setSelectedSportsbook(
                                                                          listMoneylineData?.cleansedTitle
                                                                        );
                                                                        setSelectedSportsbookUrl(
                                                                          listMoneylineData?.appUrl
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleGameInfoModal',
                                                                            value: false,
                                                                          }
                                                                        );
                                                                        setGlobalVariableValue(
                                                                          {
                                                                            key: 'toggleSportsbookModal',
                                                                            value: true,
                                                                          }
                                                                        );
                                                                        segmentLogTrack(
                                                                          segment,
                                                                          'Home Moneyline Odds Button',
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined,
                                                                          undefined
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                  >
                                                                    <View
                                                                      style={StyleSheet.applyWidth(
                                                                        {
                                                                          alignItems:
                                                                            'center',
                                                                          flexDirection:
                                                                            'row',
                                                                        },
                                                                        dimensions.width
                                                                      )}
                                                                    >
                                                                      {/* Home_Moneyline */}
                                                                      <Text
                                                                        style={StyleSheet.applyWidth(
                                                                          {
                                                                            color:
                                                                              theme
                                                                                .colors
                                                                                .backgroundInverseMainFont,
                                                                          },
                                                                          dimensions.width
                                                                        )}
                                                                        ellipsizeMode={
                                                                          'tail'
                                                                        }
                                                                        numberOfLines={
                                                                          1
                                                                        }
                                                                      >
                                                                        {oddsAmericanMoneylineSyntax(
                                                                          listMoneylineData?.homeTeamOddsAmerican
                                                                        )}
                                                                      </Text>
                                                                    </View>
                                                                  </Touchable>
                                                                </View>
                                                              );
                                                            }}
                                                            contentContainerStyle={StyleSheet.applyWidth(
                                                              { flex: 1 },
                                                              dimensions.width
                                                            )}
                                                            numColumns={1}
                                                            horizontal={true}
                                                          />
                                                        )}
                                                      </>
                                                    </View>
                                                    <Divider
                                                      style={StyleSheet.applyWidth(
                                                        { height: 1 },
                                                        dimensions.width
                                                      )}
                                                      color={
                                                        theme.colors.divider
                                                      }
                                                    />
                                                  </>
                                                );
                                              }}
                                              numColumns={1}
                                            />
                                          </ScrollView>
                                        </View>
                                      </View>
                                      {/* Promotions */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            marginBottom: 100,
                                            paddingLeft: '4%',
                                            paddingRight: '4%',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                theme.colors
                                                  .backgroundInverseMainFont,
                                              fontFamily: 'System',
                                              fontSize: 20,
                                              fontWeight: '700',
                                              marginBottom: 10,
                                              marginTop: 28,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'Promotions'}
                                        </Text>
                                        {/* BetMGM Touchable */}
                                        <Touchable
                                          onPress={() => {
                                            const handler = async () => {
                                              try {
                                                await WebBrowser.openBrowserAsync(
                                                  'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1666694'
                                                );
                                                segmentLogTrack(
                                                  segment,
                                                  'BetMGM promo clicked',
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined
                                                );
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            };
                                            handler();
                                          }}
                                          style={StyleSheet.applyWidth(
                                            { marginBottom: 6 },
                                            dimensions.width
                                          )}
                                        >
                                          <Surface
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors.divider,
                                                borderRadius: 6,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderBottomLeftRadius: 6,
                                                    borderRadius: 0,
                                                    borderTopLeftRadius: 6,
                                                    height: 50,
                                                    overflow: 'hidden',
                                                    width: 187.5,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Image
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      height: 50,
                                                      width: 187.5,
                                                    },
                                                    dimensions.width
                                                  )}
                                                  source={
                                                    Images.BetMGMGamesMoreInfoPromo
                                                  }
                                                  resizeMode={'contain'}
                                                />
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Icon
                                                  size={24}
                                                  name={
                                                    'Ionicons/ios-chevron-forward'
                                                  }
                                                  color={
                                                    theme.colors
                                                      .lightLowImportanceText
                                                  }
                                                />
                                              </View>
                                            </View>
                                          </Surface>
                                        </Touchable>
                                        {/* Unibet Touchable */}
                                        <Touchable
                                          onPress={() => {
                                            const handler = async () => {
                                              try {
                                                await WebBrowser.openBrowserAsync(
                                                  'https://wlkindred.adsrv.eacdn.com/C.ashx?btag=a_2165b_334c_&affid=76&siteid=2165&adid=334&c=[acid]'
                                                );
                                                segmentLogTrack(
                                                  segment,
                                                  'Unibet promo clicked',
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined
                                                );
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            };
                                            handler();
                                          }}
                                          style={StyleSheet.applyWidth(
                                            { marginBottom: 6 },
                                            dimensions.width
                                          )}
                                        >
                                          <Surface
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors.divider,
                                                borderRadius: 6,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderBottomLeftRadius: 6,
                                                    borderRadius: 0,
                                                    borderTopLeftRadius: 6,
                                                    height: 50,
                                                    overflow: 'hidden',
                                                    width: 187.5,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Image
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      height: 50,
                                                      width: 187.5,
                                                    },
                                                    dimensions.width
                                                  )}
                                                  resizeMode={'contain'}
                                                  source={
                                                    Images.UnibetMoreInfoPromo
                                                  }
                                                />
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Icon
                                                  color={
                                                    theme.colors
                                                      .lightLowImportanceText
                                                  }
                                                  name={
                                                    'Ionicons/ios-chevron-forward'
                                                  }
                                                  size={24}
                                                />
                                              </View>
                                            </View>
                                          </Surface>
                                        </Touchable>
                                        {/* BetRivers Touchable */}
                                        <Touchable
                                          onPress={() => {
                                            const handler = async () => {
                                              try {
                                                await WebBrowser.openBrowserAsync(
                                                  'https://www.vaultsportshq.com/betrivers'
                                                );
                                                segmentLogTrack(
                                                  segment,
                                                  'BetRivers promo clicked',
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined,
                                                  undefined
                                                );
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            };
                                            handler();
                                          }}
                                        >
                                          <Surface
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors.divider,
                                                borderRadius: 6,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderBottomLeftRadius: 6,
                                                    borderRadius: 0,
                                                    borderTopLeftRadius: 6,
                                                    height: 50,
                                                    overflow: 'hidden',
                                                    width: 187.5,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Image
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      height: 50,
                                                      width: 187.5,
                                                    },
                                                    dimensions.width
                                                  )}
                                                  resizeMode={'contain'}
                                                  source={
                                                    Images.BRGamesMoreInfoPromo
                                                  }
                                                />
                                              </View>

                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Icon
                                                  color={
                                                    theme.colors
                                                      .lightLowImportanceText
                                                  }
                                                  name={
                                                    'Ionicons/ios-chevron-forward'
                                                  }
                                                  size={24}
                                                />
                                              </View>
                                            </View>
                                          </Surface>
                                        </Touchable>
                                      </View>
                                    </>
                                  );
                                }}
                                style={StyleSheet.applyWidth(
                                  { height: '100%' },
                                  dimensions.width
                                )}
                                contentContainerStyle={StyleSheet.applyWidth(
                                  { paddingBottom: 22, paddingTop: 18 },
                                  dimensions.width
                                )}
                                numColumns={1}
                              />
                            </View>
                          </View>
                        </Modal>
                      )}
                    </>
                  </>
                );
              }}
            </SwaggerAPIApi.FetchOddsDataGET>
          </View>
        </View>
      </ScrollView>
      {/* Menu Modal */}
      <Modal
        visible={Constants['toggleMenuModal']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
      >
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleMenuModal',
                value: false,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '30%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '70%',
              justifyContent: 'space-between',
              paddingBottom: 36,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            {/* Menu Bar */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Left Button */}
              <View
                style={StyleSheet.applyWidth(
                  { width: '25%' },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                  },
                  dimensions.width
                )}
              />
              <View
                style={StyleSheet.applyWidth(
                  { width: '25%' },
                  dimensions.width
                )}
              >
                <Touchable
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Close */}
                    <Icon
                      color={theme.colors.lightLowImportanceText}
                      name={'Ionicons/ios-close'}
                      size={32}
                    />
                  </View>
                </Touchable>
              </View>
            </View>
            {/* Profile and Buttons */}
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: '4%', paddingRight: '4%' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* Profile Information Fetch */}
                <SwaggerAPIApi.FetchGetUserInfoGET
                  interanlId={Constants['internalId']}
                >
                  {({ loading, error, data, refetchGetUserInfo }) => {
                    const profileInformationFetchData = data;
                    if (!profileInformationFetchData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: 'center' }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        <Surface
                          style={StyleSheet.applyWidth(
                            { borderRadius: 31 },
                            dimensions.width
                          )}
                          elevation={2}
                        >
                          <Circle
                            size={62}
                            bgColor={theme.colors.backgroundInverseMainFont}
                          >
                            {/* Profile Picture */}
                            <>
                              {!Constants['profilePictureUrl'] ? null : (
                                <CircleImage
                                  size={60}
                                  source={{
                                    uri: `${Constants['profilePictureUrl']}`,
                                  }}
                                />
                              )}
                            </>
                            {/* Default Profile Picture */}
                            <>
                              {Constants['profilePictureUrl'] ? null : (
                                <Circle
                                  size={60}
                                  bgColor={theme.colors.lightLowImportanceText}
                                >
                                  <LinearGradient
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        height: '100%',
                                        justifyContent: 'center',
                                        width: '100%',
                                      },
                                      dimensions.width
                                    )}
                                    endY={100}
                                    endX={100}
                                    color2={theme.colors.divider}
                                    color1={theme.colors.lightLowImportanceText}
                                  >
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            theme.colors
                                              .backgroundInverseMainFont,
                                          fontFamily: 'System',
                                          fontSize: 30,
                                          fontWeight: '400',
                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {firstCharacter(
                                        profileInformationFetchData?.firstName
                                      )}
                                      {firstCharacter(
                                        profileInformationFetchData?.lastName
                                      )}
                                    </Text>
                                  </LinearGradient>
                                </Circle>
                              )}
                            </>
                          </Circle>
                        </Surface>

                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Name */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.backgroundInverseMainFont,
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {profileInformationFetchData?.firstName}{' '}
                            {profileInformationFetchData?.lastName}
                          </Text>
                          {/* Username */}
                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.lightLowImportanceText,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {'@'}
                            {profileInformationFetchData?.userName}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                </SwaggerAPIApi.FetchGetUserInfoGET>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', marginTop: 22 },
                  dimensions.width
                )}
              >
                {/* Profile & Settings */}
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
                      });
                      navigation.navigate('SettingsBetaScreen');
                      segmentLogTrack(
                        segment,
                        'Navigate to Settings',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Profile & Settings'}
                  icon={'Ionicons/ios-settings-sharp'}
                />
                {/* Sync A Sportsbook */}
                <>
                  {Constants['waitlisted'] ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'toggleMenuModal',
                            value: false,
                          });
                          navigation.navigate('SharpSportsFormScreen');
                          segmentLogTrack(
                            segment,
                            'Sync a sportsbook',
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.background,
                          borderRadius: 8,
                          color: theme.colors.backgroundInverseMainFont,
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          marginBottom: 10,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                      title={'Sync a Sportsbook'}
                      icon={'Ionicons/ios-add-circle'}
                    />
                  )}
                </>
                {/* Adjust Unit Size */}
                <Button
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'toggleMenuModal',
                        value: false,
                      });
                      navigation.navigate('AdjustUnitSizeScreen');
                      segmentLogTrack(
                        segment,
                        'Navigate to Adjust Unit Size',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  icon={'MaterialCommunityIcons/plus-minus-box'}
                  title={`Adjust Unit Size ($${Constants['userDefaultUnitSize']})`}
                />
                {/* Join the Discord */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          'https://discord.gg/6bGRD7BpUD'
                        );
                        segmentLogTrack(
                          segment,
                          'Join the Discord',
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined,
                          undefined
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.background,
                      borderRadius: 8,
                      color: theme.colors.backgroundInverseMainFont,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '700',
                      marginBottom: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Join the Discord'}
                  icon={'MaterialCommunityIcons/discord'}
                />
              </View>
            </View>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            {/* Sign Out */}
            <Button
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'toggleMenuModal',
                    value: false,
                  });
                  setGlobalVariableValue({
                    key: 'toggleSignOutActionSheet',
                    value: true,
                  });
                  segmentLogTrack(
                    segment,
                    'Open Sign Out action sheet',
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.divider,
                  borderRadius: 8,
                  color: theme.colors.backgroundInverseMainFont,
                  fontFamily: 'System',
                  fontSize: 16,
                  fontWeight: '700',
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Sign Out'}
            />
          </View>
        </View>
      </Modal>
      {/* Feedback Button View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            bottom: 30,
            position: 'absolute',
            right: 20,
          },
          dimensions.width
        )}
      >
        <Surface
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderRadius: 28,
              minHeight: 40,
            },
            dimensions.width
          )}
          elevation={2}
        >
          <Touchable
            onPress={() => {
              try {
                Linking.openURL(
                  'https://docs.google.com/forms/d/e/1FAIpQLSdeviZa5Q1Aj2O8KJiIJsa90dfXASqE-3FgV5S33hU52vxguQ/viewform?usp=sf_link'
                );
                segmentLogTrack(
                  segment,
                  'Feedback button clicked',
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Circle bgColor={theme.colors.primary} size={56}>
              <Icon
                size={24}
                name={'MaterialIcons/feedback'}
                color={theme.colors.background}
              />
            </Circle>
          </Touchable>
        </Surface>
      </View>
      {/* Action Sheet - Sign Out */}
      <ActionSheet visible={Constants['toggleSignOutActionSheet']}>
        {/* Action Sheet Item - Sign Out */}
        <ActionSheetItem
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleSignOutActionSheet',
                value: false,
              });
              setGlobalVariableValue({
                key: 'authToken',
                value: '',
              });
              navigation.navigate('Welcome_Stack', {
                screen: 'Welcome1Screen',
              });
              segmentLogTrack(
                segment,
                'User sign out',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
              );
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            { fontSize: 18, textAlign: 'center' },
            dimensions.width
          )}
          label={'Sign Out'}
          color={theme.colors.strong}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'toggleSignOutActionSheet',
                value: false,
              });
              setGlobalVariableValue({
                key: 'toggleMenuModal',
                value: true,
              });
              segmentLogTrack(
                segment,
                'Sign out action sheet closed',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
              );
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            { fontFamily: 'System', fontSize: 18, fontWeight: '700' },
            dimensions.width
          )}
          label={'Cancel'}
        />
      </ActionSheet>
      {/* Games Tutorial Modal */}
      <Modal
        visible={Constants['gamesScreenTutorial']}
        animationType={'slide'}
        transparent={true}
        presentationStyle={'pageSheet'}
      >
        <View
          style={StyleSheet.applyWidth({ height: '50%' }, dimensions.width)}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: '50%',
              justifyContent: 'space-between',
              paddingBottom: 50,
              paddingLeft: 28,
              paddingRight: 28,
              paddingTop: 16,
            },
            dimensions.width
          )}
        >
          <View>
            {/* Games Tutorial 1 */}
            <>
              {!tutorialScreenCounter1(Constants['gamesTutorial']) ? null : (
                <View>
                  {/* Image */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'],
                          { height: 100, width: 325 }
                        ),
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.TutorialPicturesLineShop}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 28 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 20,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Shop for the best line'}
                    </Text>
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 18 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontSize: 18,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Find the best line before betting every time.'}
                    </Text>
                  </View>
                </View>
              )}
            </>
            {/* Games Tutorial 2 */}
            <>
              {!tutorialScreenCounter2(Constants['gamesTutorial']) ? null : (
                <View>
                  {/* Image */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Image
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'],
                          { height: 100, width: 325 }
                        ),
                        dimensions.width
                      )}
                      resizeMode={'cover'}
                      source={Images.TutorialPicturesPromos}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 28 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontFamily: 'System',
                            fontSize: 20,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Discover exciting promos'}
                    </Text>
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 18 },
                      dimensions.width
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'],
                          {
                            color:
                              theme.colors['Background Inverse (Main Font)'],
                            fontSize: 18,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Click on the lines to find sportsbook promos!'}
                    </Text>
                  </View>
                </View>
              )}
            </>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 35, paddingRight: 35 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
                dimensions.width
              )}
            >
              {/* Icon_Gold */}
              <>
                {!tutorialScreenCounter1(Constants['gamesTutorial']) ? null : (
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginLeft: 2, marginRight: 2 },
                      dimensions.width
                    )}
                    name={'MaterialIcons/circle'}
                    color={theme.colors['Primary']}
                    size={10}
                  />
                )}
              </>
              {/* Icon_Gray */}
              <Icon
                style={StyleSheet.applyWidth(
                  { marginLeft: 2, marginRight: 2 },
                  dimensions.width
                )}
                name={'MaterialIcons/circle'}
                size={10}
                color={theme.colors['Light_low_importance_text']}
              />
              {/* Icon_Gold */}
              <>
                {!tutorialScreenCounter2(Constants['gamesTutorial']) ? null : (
                  <Icon
                    style={StyleSheet.applyWidth(
                      { marginLeft: 2, marginRight: 2 },
                      dimensions.width
                    )}
                    name={'MaterialIcons/circle'}
                    color={theme.colors['Primary']}
                    size={10}
                  />
                )}
              </>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { width: '45%' },
                  dimensions.width
                )}
              >
                {/* Back */}
                <Button
                  onPress={() => {
                    try {
                      if (tutorialScreenCounter1(Constants['gamesTutorial'])) {
                        return;
                      }
                      setGlobalVariableValue({
                        key: 'gamesTutorial',
                        value: Constants['gamesTutorial'] - 1,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      {
                        backgroundColor: theme.colors['Divider'],
                        color: theme.colors['Light_low_importance_text'],
                        fontSize: 16,
                        marginTop: 24,
                        paddingBottom: 15,
                        paddingTop: 15,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
              </View>

              <View
                style={StyleSheet.applyWidth(
                  { width: '45%' },
                  dimensions.width
                )}
              >
                {/* Next */}
                <>
                  {!tutorialScreenCounter1(
                    Constants['gamesTutorial']
                  ) ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'gamesTutorial',
                            value: Constants['gamesTutorial'] + 1,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'],
                          {
                            color: theme.colors['Strong_Text_on_gold_buttons'],
                            fontSize: 16,
                            marginTop: 24,
                            paddingBottom: 15,
                            paddingTop: 15,
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Next'}
                    />
                  )}
                </>
                {/* Close */}
                <>
                  {!tutorialScreenCounter2(
                    Constants['gamesTutorial']
                  ) ? null : (
                    <Button
                      onPress={() => {
                        try {
                          setGlobalVariableValue({
                            key: 'gamesScreenTutorial',
                            value: false,
                          });
                          setGlobalVariableValue({
                            key: 'gamesTutorial',
                            value: 1,
                          });
                          segmentLogTrack(
                            segment,
                            'Games Screen Tutorial Completed',
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'],
                          {
                            color: theme.colors['Strong_Text_on_gold_buttons'],
                            fontSize: 16,
                            marginTop: 24,
                            paddingBottom: 15,
                            paddingTop: 15,
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Close'}
                    />
                  )}
                </>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Shadow
        paintInside={true}
        showShadowSideStart={true}
        showShadowSideEnd={true}
        showShadowSideTop={true}
        showShadowSideBottom={true}
        showShadowCornerTopStart={true}
        showShadowCornerTopEnd={true}
        showShadowCornerBottomStart={true}
        showShadowCornerBottomEnd={true}
      />
    </ScreenContainer>
  );
};

export default withTheme(GamesScreen);
