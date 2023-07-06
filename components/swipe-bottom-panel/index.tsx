import React from 'react';
import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';

export const SwipeBottomPanel = React.forwardRef<any, BottomSheetProps>(
  ({ children, index, snapPoints }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        index={index}
        snapPoints={snapPoints}
        animateOnMount={false}
      >
        {children}
      </BottomSheetModal>
    );
  },
);
