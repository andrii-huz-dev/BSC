import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Button,
  Card,
  Avatar,
  ActivityIndicator,
  MD2Colors,
  Divider,
} from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from 'react-query';
import { SwipeBottomPanel } from '../../components/swipe-bottom-panel';
import { getComments, getPosts } from '../../api/home/query';
import { HomeHeader } from './components/header';

enum LIST_NAMES {
  POSTS = 'posts',
  COMMENTS = 'comments',
}

export const Home = () => {
  const [loadPosts, setLoadPosts] = useState(false);
  const [loadComments, setLoadComments] = useState(false);

  const [activeListName, setActiveListName] = useState(LIST_NAMES.POSTS);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const toggleBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const {
    data: posts,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
  } = useQuery(['posts'], getPosts, {
    onSuccess: () => setActiveListName(LIST_NAMES.POSTS),
    onSettled: () => {
      setLoadPosts(false);
      bottomSheetModalRef.current?.close();
    },
    enabled: loadPosts,
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isFetching: isCommentsFetching,
  } = useQuery(['comments'], getComments, {
    onSuccess: () => setActiveListName(LIST_NAMES.COMMENTS),
    onSettled: () => {
      setLoadComments(false);
      bottomSheetModalRef.current?.close();
    },
    enabled: loadComments,
  });

  const activeList = useMemo(() => {
    if (activeListName === LIST_NAMES.POSTS) {
      return posts;
    }

    return comments;
  }, [activeListName, posts, comments]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <Card.Title
          key={item.id}
          title={activeListName === LIST_NAMES.POSTS ? item.title : item.email}
          subtitle={item.body}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={
                activeListName === LIST_NAMES.POSTS
                  ? 'post-outline'
                  : 'comment-text-outline'
              }
            />
          )}
        />
      );
    },
    [activeListName],
  );

  return (
    <View style={styles.wrapper}>
      <HomeHeader toggleBottomSheet={toggleBottomSheet} />

      {loadPosts || loadComments ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={MD2Colors.blue500}
        />
      ) : (
        <FlatList
          extraData={activeListName}
          data={activeList}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={renderItem}
        />
      )}

      <SwipeBottomPanel
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['30%']}
      >
        <View style={styles.dropdownButtonWrapper}>
          <Button
            disabled={isPostsLoading || isPostsFetching}
            loading={isPostsLoading || isPostsFetching}
            mode="outlined"
            onPress={() => setLoadPosts(true)}
          >
            {isPostsLoading || isPostsFetching ? 'Loading..' : 'Load Posts'}
          </Button>
          <Button
            disabled={isCommentsLoading || isCommentsFetching}
            loading={isCommentsLoading || isCommentsFetching}
            mode="outlined"
            onPress={() => setLoadComments(true)}
          >
            {isCommentsLoading || isCommentsFetching
              ? 'Loading..'
              : 'Load Comments'}
          </Button>
        </View>
      </SwipeBottomPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 10,
  },
  button: {
    marginTop: 15,
    textAlign: 'center',
  },
  dropdownButtonWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
});
