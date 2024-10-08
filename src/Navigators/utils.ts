/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */

import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {Platform} from 'react-native';

export type RootStackParamList = {
  FeedScreen: undefined;
  CreatePostScreen: undefined;
  ProfileScreen: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
}

export function navigateAndSimpleReset(
  name: keyof RootStackParamList,
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
}



export const IS_ANDROID = Platform.OS === 'android';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;