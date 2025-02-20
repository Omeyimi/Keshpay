<PageContainer justifyContent="center">
  <Wrapper paddingHorizontal height="70%">
    <Image source={Nenna} resizeMode="contain" />
  </Wrapper>
  <GroupedSpacer />
  <Wrapper paddingHorizontal>
    <StyledButton
      text="Vote"
      onPress={() => {
        handleOpenAuthScreen();
      }}
    />
  </Wrapper>

  <BottomSheet
    isVisible={isVisible}
    containerStyle={{
      backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.7)',
    }}>
    <Wrapper
      height={Dimensions.get('window').height}
      justifyContent="space-between">
      <TopSection handleCloseAuthScreen={handleCloseAuthScreen} />

      <BottomCard handleCloseAuthScreen={handleCloseAuthScreen} />
    </Wrapper>
  </BottomSheet>
</PageContainer>;
