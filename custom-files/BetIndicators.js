import React, { Fragment } from 'react';
import { View } from 'react-native';
import {
  VictoryLabel,
  VictoryBar,
  VictoryContainer,
  VictoryGroup,
} from 'victory-native';
import { Svg } from 'react-native-svg';

//// CAN BE APPLIED TO ALL GRAPHS ////

let w = 340;
let h = 60;
let wSmall = 180;
let hSmall = 12;

// Victory Bar for Total Bets
export function VictoryBarTotal({ bet }) {
  position = bet.position;
  line = bet.line;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  currentTotal = awayScore + homeScore;

  currentTotalScaleAdjusted =
    currentTotal / line < 0.05 && currentTotal > 0 ? line * 0.05 : currentTotal;

  // Bar Color
  if (
    ((position == 'Over' || position == 'over') && currentTotal > line) ||
    ((position == 'Under' || position == 'under') && currentTotal < line)
  ) {
    barColor = '#0bbb00';
  } else if (
    ((position == 'Under' || position == 'under') && currentTotal > line) ||
    ((position == 'Over' || position == 'over') && currentTotal < line)
  ) {
    barColor = '#ff9a01';
  } else {
    barColor = '#F2F2F2';
  }

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={w}
            height={h}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryLabel
                  style={[
                    { fill: '#F2F2F2', fontSize: 12, fontWeight: 'bold' },
                  ]}
                  dx={0}
                  dy={10}
                  textAnchor="middle"
                  verticalAnchor="start"
                />
              }
              data={[{ x: 1, y: line, y0: 0 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                bottomRight: 5,
                topLeft: 5,
                bottomLeft: 5,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              labels={({ datum }) => `${currentTotal}`}
              labelComponent={
                <VictoryLabel
                  style={[
                    { fill: '#F2F2F2', fontSize: 12, fontWeight: 'bold' },
                  ]}
                  dx={0}
                  dy={-10}
                  textAnchor="middle"
                  verticalAnchor="end"
                />
              }
              data={[{ x: 1, y: currentTotalScaleAdjusted, y0: 0 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                bottomRight: 5,
                topLeft: 5,
                bottomLeft: 5,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Victory Bar for Moneyline Bets
export function VictoryBarMoneyline({ bet }) {
  awayTeam = bet.event.awayTeam;
  homeTeam = bet.event.homeTeam;
  position = bet.position;
  league = bet.event.league;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  scoreDifference = homeScore - awayScore;

  if (league == 'NFL' || league == 'NCAAF') {
    barScale = 28;
  } else if (league == 'NBA' || league == 'NCAAMB' || league == 'NCAAB') {
    barScale = 25;
  } else if (league == 'MLB') {
    barScale = 8;
  } else if (league == 'NHL') {
    barScale = 6;
  } else {
    barScale = 20;
  }

  // Moneyline Bar Configuration
  if (position == awayTeam && scoreDifference < 0) {
    barColor = '#0bbb00';
    //Making sure the bar doesn't max out
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 20
        : -barScale - barScale / 20;
    homeBar = barScale / 20;
  } else if (position == homeTeam && scoreDifference > 0) {
    barColor = '#0bbb00';
    awayBar = -barScale / 20;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 20
        : barScale + barScale / 20;
  } else if (position == awayTeam && scoreDifference > 0) {
    barColor = '#ff9a01';
    awayBar = -barScale / 20;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 20
        : barScale + barScale / 20;
  } else if (position == homeTeam && scoreDifference < 0) {
    barColor = '#ff9a01';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 20
        : -barScale - barScale / 20;
    homeBar = barScale / 20;
  } else {
    barColor = '#F2F2F2';
    awayBar = -barScale / 20;
    homeBar = barScale / 20;
  }

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={w}
            height={h}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: barScale, y0: barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: -barScale, y0: -barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: homeBar, y0: barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: awayBar, y0: -barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Victory Bar for Spread Bets
//export const VictoryLineNetProfit = ({ singleBetListData }) => {
export function VictoryBarSpread({ bet }) {
  awayTeam = bet.event.awayTeam;
  homeTeam = bet.event.homeTeam;
  position = bet.position;
  line = bet.line;
  league = bet.event.league;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  scoreDifference = homeScore - awayScore;

  if (league == 'NFL' || league == 'NCAAF') {
    barScale = 28;
  } else if (league == 'NBA' || league == 'NCAAMB' || league == 'NCAAB') {
    barScale = 25;
  } else if (league == 'MLB') {
    barScale = 8;
  } else if (league == 'NHL') {
    barScale = 6;
  } else {
    barScale = 20;
  }

  // Spread Bar Configuration
  if (
    (position == homeTeam && line < 0 && scoreDifference > Math.abs(line)) ||
    (position == homeTeam && line > 0 && scoreDifference > 0) ||
    (position == awayTeam &&
      line > 0 &&
      scoreDifference < Math.abs(line) &&
      scoreDifference > 0)
  ) {
    barColor = '#0bbb00';
    //Making sure the bar doesn't max out (Divide by 20, or 5% of full bar)
    awayBar = -barScale / 20;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 20
        : barScale + barScale / 20;
  } else if (
    (position == homeTeam &&
      line < 0 &&
      scoreDifference < Math.abs(line) &&
      scoreDifference > 0) ||
    (position == awayTeam && line < 0 && scoreDifference > 0) ||
    (position == awayTeam && line > 0 && scoreDifference > Math.abs(line))
  ) {
    barColor = '#ff9a01';
    awayBar = -barScale / 20;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 20
        : barScale + barScale / 20;
  } else if (
    (position == homeTeam && line < 0 && scoreDifference < 0) ||
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) > Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) < Math.abs(line))
  ) {
    barColor = '#ff9a01';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 20
        : -barScale - barScale / 20;
    homeBar = barScale / 20;
  } else if (
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) < Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) > Math.abs(line)) ||
    (position == awayTeam && line > 0 && scoreDifference < 0)
  ) {
    barColor = '#0bbb00';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 20
        : -barScale - barScale / 20;
    homeBar = barScale / 20;
  } else if (
    (position == homeTeam && line < 0 && scoreDifference == Math.abs(line)) ||
    (position == awayTeam && line > 0 && scoreDifference == Math.abs(line))
  ) {
    barColor = '#F2F2F2';
    awayBar = -barScale / 20;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 20
        : barScale + barScale / 20;
  } else if (
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) == Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) == Math.abs(line))
  ) {
    barColor = '#F2F2F2';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 20
        : -barScale - barScale / 20;
    homeBar = barScale / 20;
  } else {
    barColor = '#F2F2F2';
    awayBar = -barScale / 20;
    homeBar = barScale / 20;
  }

  // Spread Indicator Configuration (Locating, Preventing max out)
  if (
    (position == homeTeam && line < 0) ||
    (position == awayTeam && line > 0)
  ) {
    spreadLineIndicator =
      Math.abs(line) + barScale / 20 <= barScale
        ? Math.abs(line) + barScale / 20
        : barScale + barScale / 20;
  } else if (
    (position == homeTeam && line > 0) ||
    (position == awayTeam && line < 0)
  ) {
    spreadLineIndicator =
      -Math.abs(line) - barScale / 20 >= -barScale
        ? -Math.abs(line) - barScale / 20
        : -barScale - barScale / 20;
  } else {
    spreadLineIndicator = null;
  }

  // Spread Indicator Label Configuration
  lineLabel = line > 0 ? '+' + line : line;

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={w}
            height={h}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: barScale, y0: barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: -barScale, y0: -barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{
                data: { fill: '#F2F2F2' },
              }}
              labels={({ datum }) => lineLabel}
              labelComponent={
                <VictoryLabel
                  style={[
                    { fill: '#F2F2F2', fontSize: 12, fontWeight: 'bold' },
                  ]}
                  dx={1.5}
                  dy={-12}
                  textAnchor="middle"
                  verticalAnchor="end"
                />
              }
              barWidth={18}
              cornerRadius={{
                topRight: 0,
                topLeft: 0,
                bottomRight: 0,
                bottomLeft: 0,
              }}
              data={[
                {
                  x: 1,
                  y: spreadLineIndicator - barScale / 170,
                  y0: spreadLineIndicator + barScale / 170,
                },
              ]}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: homeBar, y0: barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: awayBar, y0: -barScale / 20 }]}
              barWidth={10}
              cornerRadius={{
                topRight: 5,
                topLeft: 5,
                bottomRight: 2,
                bottomLeft: 2,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Small Victory Bar for Total Bets
export function VictoryBarTotalSmall({ bet }) {
  position = bet.position;
  line = bet.line;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  currentTotal = awayScore + homeScore;

  currentTotalScaleAdjusted =
    currentTotal / line < 0.05 && currentTotal > 0 ? line * 0.05 : currentTotal;

  currentTotalScaleAdjusted =
    currentTotal / line < 0.05 && currentTotal > 0 ? line * 0.05 : currentTotal;

  // Bar Color
  if (
    ((position == 'Over' || position == 'over') && currentTotal > line) ||
    ((position == 'Under' || position == 'under') && currentTotal < line)
  ) {
    barColor = '#0bbb00';
  } else if (
    ((position == 'Under' || position == 'under') && currentTotal > line) ||
    ((position == 'Over' || position == 'over') && currentTotal < line)
  ) {
    barColor = '#ff9a01';
  } else {
    barColor = '#F2F2F2';
  }

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={wSmall}
            height={hSmall}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: line, y0: 0 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                bottomRight: 2,
                topLeft: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: currentTotalScaleAdjusted, y0: 0 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                bottomRight: 2,
                topLeft: 2,
                bottomLeft: 2,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Small Victory Bar for Moneyline Bets
export function VictoryBarMoneylineSmall({ bet }) {
  awayTeam = bet.event.awayTeam;
  homeTeam = bet.event.homeTeam;
  position = bet.position;
  league = bet.event.league;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  scoreDifference = homeScore - awayScore;

  if (league == 'NFL' || league == 'NCAAF') {
    barScale = 28;
  } else if (league == 'NBA' || league == 'NCAAMB' || league == 'NCAAB') {
    barScale = 25;
  } else if (league == 'MLB') {
    barScale = 8;
  } else if (league == 'NHL') {
    barScale = 6;
  } else {
    barScale = 20;
  }

  // Moneyline Bar Configuration
  if (position == awayTeam && scoreDifference < 0) {
    barColor = '#0bbb00';
    //Making sure the bar doesn't max out
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 12
        : -barScale - barScale / 12;
    homeBar = barScale / 12;
  } else if (position == homeTeam && scoreDifference > 0) {
    barColor = '#0bbb00';
    awayBar = -barScale / 12;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 12
        : barScale + barScale / 12;
  } else if (position == awayTeam && scoreDifference > 0) {
    barColor = '#ff9a01';
    awayBar = -barScale / 12;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 12
        : barScale + barScale / 12;
  } else if (position == homeTeam && scoreDifference < 0) {
    barColor = '#ff9a01';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 12
        : -barScale - barScale / 12;
    homeBar = barScale / 12;
  } else {
    barColor = '#F2F2F2';
    awayBar = -barScale / 12;
    homeBar = barScale / 12;
  }

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={wSmall}
            height={hSmall}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: barScale, y0: barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: -barScale, y0: -barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: homeBar, y0: barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: awayBar, y0: -barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Small Victory Bar for Spread Bets
export function VictoryBarSpreadSmall({ bet }) {
  awayTeam = bet.event.awayTeam;
  homeTeam = bet.event.homeTeam;
  position = bet.position;
  line = bet.line;
  league = bet.event.league;
  awayScore = bet.event.awayScore;
  homeScore = bet.event.homeScore;

  scoreDifference = homeScore - awayScore;

  if (league == 'NFL' || league == 'NCAAF') {
    barScale = 28;
  } else if (league == 'NBA' || league == 'NCAAMB' || league == 'NCAAB') {
    barScale = 25;
  } else if (league == 'MLB') {
    barScale = 8;
  } else if (league == 'NHL') {
    barScale = 6;
  } else {
    barScale = 20;
  }

  // Spread Bar Configuration
  if (
    (position == homeTeam && line < 0 && scoreDifference > Math.abs(line)) ||
    (position == homeTeam && line > 0 && scoreDifference > 0) ||
    (position == awayTeam &&
      line > 0 &&
      scoreDifference < Math.abs(line) &&
      scoreDifference > 0)
  ) {
    barColor = '#0bbb00';
    //Making sure the bar doesn't max out (Divide by 12 of full bar)
    awayBar = -barScale / 12;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 12
        : barScale + barScale / 12;
  } else if (
    (position == homeTeam &&
      line < 0 &&
      scoreDifference < Math.abs(line) &&
      scoreDifference > 0) ||
    (position == awayTeam && line < 0 && scoreDifference > 0) ||
    (position == awayTeam && line > 0 && scoreDifference > Math.abs(line))
  ) {
    barColor = '#ff9a01';
    awayBar = -barScale / 12;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 12
        : barScale + barScale / 12;
  } else if (
    (position == homeTeam && line < 0 && scoreDifference < 0) ||
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) > Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) < Math.abs(line))
  ) {
    barColor = '#ff9a01';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 12
        : -barScale - barScale / 12;
    homeBar = barScale / 12;
  } else if (
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) < Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) > Math.abs(line)) ||
    (position == awayTeam && line > 0 && scoreDifference < 0)
  ) {
    barColor = '#0bbb00';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 12
        : -barScale - barScale / 12;
    homeBar = barScale / 12;
  } else if (
    (position == homeTeam && line < 0 && scoreDifference == Math.abs(line)) ||
    (position == awayTeam && line > 0 && scoreDifference == Math.abs(line))
  ) {
    barColor = '#F2F2F2';
    awayBar = -barScale / 12;
    homeBar =
      scoreDifference <= barScale
        ? scoreDifference + barScale / 12
        : barScale + barScale / 12;
  } else if (
    (position == homeTeam &&
      line > 0 &&
      Math.abs(scoreDifference) == Math.abs(line)) ||
    (position == awayTeam &&
      line < 0 &&
      Math.abs(scoreDifference) == Math.abs(line))
  ) {
    barColor = '#F2F2F2';
    awayBar =
      Math.abs(scoreDifference) <= barScale
        ? scoreDifference - barScale / 12
        : -barScale - barScale / 12;
    homeBar = barScale / 12;
  } else {
    barColor = '#F2F2F2';
    awayBar = -barScale / 12;
    homeBar = barScale / 12;
  }

  // Spread Indicator Configuration (Locating, Preventing max out)
  if (
    (position == homeTeam && line < 0) ||
    (position == awayTeam && line > 0)
  ) {
    spreadLineIndicator =
      Math.abs(line) + barScale / 12 <= barScale
        ? Math.abs(line) + barScale / 12
        : barScale + barScale / 12;
  } else if (
    (position == homeTeam && line > 0) ||
    (position == awayTeam && line < 0)
  ) {
    spreadLineIndicator =
      -Math.abs(line) - barScale / 12 >= -barScale
        ? -Math.abs(line) - barScale / 12
        : -barScale - barScale / 12;
  } else {
    spreadLineIndicator = null;
  }

  // Spread Indicator Label Configuration
  lineLabel = line > 0 ? '+' + line : line;

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={wSmall}
            height={hSmall}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: barScale, y0: barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: -barScale, y0: -barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{
                data: { fill: '#F2F2F2' },
              }}
              barWidth={10}
              cornerRadius={{
                topRight: 0,
                topLeft: 0,
                bottomRight: 0,
                bottomLeft: 0,
              }}
              data={[
                {
                  x: 1,
                  y: spreadLineIndicator - barScale / 150,
                  y0: spreadLineIndicator + barScale / 150,
                },
              ]}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: homeBar, y0: barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: awayBar, y0: -barScale / 12 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                topLeft: 2,
                bottomRight: 1,
                bottomLeft: 1,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}

// Small Victory Bar for Total Bets
export function VictoryBarTotalSmallTest() {
  position = 'Over';
  line = 12;
  awayScore = 10;
  homeScore = 15;

  currentTotal = awayScore + homeScore;

  currentTotalScaleAdjusted =
    currentTotal / line < 0.05 && currentTotal > 0 ? line * 0.05 : currentTotal;

  currentTotalScaleAdjusted =
    currentTotal / line < 0.05 && currentTotal > 0 ? line * 0.05 : currentTotal;

  // Bar Color
  if (
    ((position == 'Over' || position == 'over') && currentTotal > line) ||
    ((position == 'Under' || position == 'under') && currentTotal < line)
  ) {
    barColor = '#0bbb00';
  } else if (
    ((position == 'Under' || position == 'under') && currentTotal > line) ||
    ((position == 'Over' || position == 'over') && currentTotal < line)
  ) {
    barColor = '#ff9a01';
  } else {
    barColor = '#F2F2F2';
  }

  return (
    <Fragment>
      <View>
        <Svg>
          <VictoryGroup
            horizontal
            domainPadding={0}
            width={wSmall}
            height={hSmall}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryBar
              style={{ data: { fill: '#242323' } }}
              data={[{ x: 1, y: line, y0: 0 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                bottomRight: 2,
                topLeft: 2,
                bottomLeft: 2,
              }}
            />
            <VictoryBar
              style={{ data: { fill: barColor } }}
              data={[{ x: 1, y: currentTotalScaleAdjusted, y0: 0 }]}
              barWidth={4}
              cornerRadius={{
                topRight: 2,
                bottomRight: 2,
                topLeft: 2,
                bottomLeft: 2,
              }}
            />
          </VictoryGroup>
        </Svg>
      </View>
    </Fragment>
  );
}
