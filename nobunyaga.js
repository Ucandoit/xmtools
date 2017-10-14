// console.log(location.href);
if (location.href.indexOf("app0.mixi") >= 0 || location.href.indexOf("app.mbga") >= 0 || location.href.indexOf("ld.mygc") >= 0) {
	var xmModel = {
		questId: 1
	};

	// 0 dazei
	// 1 read report
	// 2 draw
	// 3 construct house
	// 4 move cat

	var xmActions = {
		// clickAction: function(selector, resolve) {
		// 	if (selector.length > 0) {
		// 		selector[0].click();
		// 		resolve();
		// 	} else {
		// 		setTimeout(function() {
		// 			xmActions.clickAction(selector, resolve);
		// 		}, 3000);
		// 	}
		// },
		debug: function(_message) {
			console.log(_message);
		},
		doQuest: function() {
			switch (xmModel.questId) {
				case 1:
					xmActions.toMap(xmActions.fightEnemy);
					break;
				case 2:
					xmActions.toReport(xmActions.readReport);
					break;
				case 3:
					xmActions.toDrawMenu();
					break;
				case 4:
					xmActions.toHome(xmActions.upgradeHouse);
					break;
				case 5:
					xmActions.toCatsList();
					break;
				case 6:
					xmActions.toTeam(xmActions.swapCat);
					break;
				case 7:
					xmActions.toHome(function() {
						xmActions.constructBuilding('area.map00');
					});
					break;
				case 8:
					xmActions.toHome(function() {
						xmActions.constructBuilding('area.map01');
					});
					break;
				case 9:
					xmActions.toHome(function() {
						xmActions.constructBuilding('area.map02');
					});
					break;
				case 10:
					xmActions.toHome(function() {
						xmActions.constructBuilding('area.map05');
					});
					break;
				case 11:
					xmActions.toHome(xmActions.trainCat);
					break;
				case 12:
					xmActions.toHome(function() {
						xmActions.constructBuilding('area.map06');
					});
					break;
				case 13:
					xmActions.toHome(xmActions.developSkill);
					break;
				case 14:
					xmActions.toTeam(xmActions.addSkill);
					break;
				case 15:
					xmActions.toTeam(xmActions.switchLeader);
					break;
				case 16:
					xmActions.toMap(xmActions.fightEnemy);
					break;
				case 17:
					xmActions.toReport(xmActions.watchFight);
					break;
				default:
			}
		},
		clickAction: function(_selector, _nextAction) {
			if ($(_selector).length > 0) {
				$(_selector)[0].click();
				setTimeout(_nextAction, 2000);
			} else {
				setTimeout(function() {
					console.log('wait for web page rendering.');
					xmActions.clickAction(_selector, _nextAction);
				}, 3000);
			}
		},
		toHome: function(_nextAction) {
			xmActions.debug('xmActions.toHome');
			xmActions.clickAction('img[alt=里]', _nextAction);
		},
		toMap: function(_nextAction) {
			xmActions.debug('xmActions.toMap');
			xmActions.clickAction('img[alt=全国地図]', _nextAction);
		},
		toTeam: function(_nextAction) {
			xmActions.debug('xmActions.toTeam');
			xmActions.clickAction('img[alt=編成]', _nextAction);
		},
		toCatsList: function() {
			xmActions.debug('xmActions.toCatsList');
			xmActions.clickAction('img[alt=武将一覧]', xmActions.toStock);
		},
		toStock: function() {
			xmActions.debug('xmActions.toStock');
			xmActions.clickAction('img.tab-file', xmActions.moveOutCat);
		},
		toReport: function(_nextAction) {
			xmActions.debug('xmActions.toReport');
			xmActions.clickAction('img[alt=報告書]',_nextAction);
		},
		toQuestMenu: function() {
			xmActions.debug('xmActions.toQuestMenu');
			xmActions.clickAction('#teacher-map img', xmActions.completeQuest);
		},
		toDrawMenu: function() {
			xmActions.debug('xmActions.toDrawMenu');
			xmActions.clickAction('#nyaomikuji-map', xmActions.drawNormal);
		},
		completeQuest: function() {
			xmActions.debug('xmActions.completeQuest');
			xmActions.clickAction('input[alt=報酬を受け取る]', function() {
				xmModel.questId = xmModel.questId + 1;
				xmActions.doQuest();
			});
			// if ($('input[alt=報酬を受け取る]').length > 0) {
			// 	$('input[alt=報酬を受け取る]').eq(0).click();
			// 	setTimeout(function() {
			// 		console.log('next');
			// 	}, 1000);
			// } else {
			// 	setTimeout(xmActions.completeQuest, 3000);
			// }
		},
		fightEnemy: function() {
			xmActions.debug('xmActions.fightEnemy');
			xmActions.clickAction('.map_point_e', xmActions.confirmFight);
		},
		confirmFight: function() {
			xmActions.debug('xmActions.confirmFight');
			xmActions.clickAction('.quest-ok-button img:visible', xmActions.goFight);
		},
		goFight: function() {
			xmActions.debug('xmActions.confirmFight');
			xmActions.clickAction('#dialog_g', xmActions.confirmGoFight);
		},
		confirmGoFight: function() {
			xmActions.debug('xmActions.confirmGoFight');
			xmActions.clickAction('#btl-ok-button .neko-alert-button', xmActions.waitFight);
		},
		waitFight: function() {
			xmActions.debug('xmActions.waitFight');
			if ($('#notify_count_main').length > 0) {
				setTimeout(xmActions.waitFight, 5000);
			} else {
				setTimeout(xmActions.toQuestMenu, 2000);
			}
		},
		readReport: function() {
			if ($('tr.battle td .left a').length > 0) {
				$('tr.battle td .left a')[0].click();
				setTimeout(xmActions.toQuestMenu, 1000);
			} else {
				console.log('wait for web page rendering.');
				setTimeout(xmActions.readReport, 3000);
			}
		},
		drawNormal: function() {
			xmActions.debug('xmActions.drawNormal');
			xmActions.clickAction('input[name=button1]', function() {
				xmActions.confirmDialog(xmActions.toQuestMenu);
			});
		},
		upgradeHouse: function() {
			xmActions.debug('xmActions.upgradeHouse');
			xmActions.clickAction('area.type01', function() {
				xmActions.confirmUpgrade(function() {
					xmActions.waitFinish(xmActions.toQuestMenu, true);
				});
			});
		},
		waitFinish: function(_nextAction, confirmAlert) {
			xmActions.debug('xmActions.waitFinish');
			if ($.trim($("#doing").html()) == '') {
				if (confirmAlert) {
					setTimeout(function() {
						xmActions.confirmAlert(_nextAction);
					}, 1000);
				} else {
					setTimeout(_nextAction, 1000);
				}
			} else {
				setTimeout(function() {
					xmActions.waitFinish(_nextAction, confirmAlert);
				}, 5000);
			}
		},
		moveOutCat: function() {
			xmActions.debug('xmActions.moveOutCat');
			xmActions.clickAction('.recruit-button .neko-button', function() {
				xmActions.confirmDialog(xmActions.toQuestMenu);
			});
		},
		swapCat: function() {
			xmActions.debug('xmActions.swapCat');
			if ($('#reserve-card1').length > 0) {
				$('#reserve-card1').simulate('drag-n-drop', {dropTarget: $('#deck-card1')});
				setTimeout(xmActions.updateTeam, 2000);
			} else {
				console.log('wait for web page rendering.');
				setTimeout(xmActions.swapCat, 3000);
			}
		},
		updateTeam: function() {
			xmActions.debug('xmActions.updateTeam');
			xmActions.clickAction('img[alt=更新]', xmActions.toQuestMenu);
		},
		constructBuilding: function(position) {
			xmActions.debug('xmActions.constructBuilding');
			xmActions.clickAction(position, function() {
				xmActions.confirmBuild(function() {
					xmActions.waitFinish(xmActions.toQuestMenu, false);
				});
			});
		},
		trainCat: function() {
			xmActions.debug('xmActions.trainCat');
			$('img[alt=シャムづ家久]').simulate('drag-n-drop', {dropTarget: $('img.type03')});
			setTimeout(function() {
				xmActions.confirmDialog(function() {
					xmActions.waitFinish(xmActions.toQuestMenu, false);
				});
			}, 2000);
		},
		developSkill: function() {
			xmActions.debug('xmActions.developSkill');
			xmActions.clickAction('area.type09', xmActions.openDevelop);
		},
		openDevelop: function() {
			xmActions.debug('xmActions.openDevelop');
			xmActions.clickAction('#develop-open06 img', xmActions.confirmDevelop);
		},
		confirmDevelop: function() {
			xmActions.debug('xmActions.confirmDevelop');
			xmActions.clickAction('.develop-button img', function() {
				xmActions.confirmDialog(function() {
					xmActions.waitFinish(xmActions.toQuestMenu, false);
				});
			});
		},
		addSkill: function() {
			xmActions.debug('xmActions.addSkill');
			xmActions.clickAction('img[alt=五輪奥義設定]', xmActions.moveSkill);
		},
		moveSkill: function() {
			xmActions.debug('xmActions.moveSkill');
			$('.td-reserve-pool .td-reserve-frame').simulate('drag-n-drop', {dropTarget: $('.td-select-frame2.ui-droppable')});
			setTimeout(xmActions.confirmAddSkill, 2000);
		},
		confirmAddSkill: function() {
			xmActions.debug('xmActions.confirmAddSkill');
			xmActions.clickAction('img[alt=設定を完了する]', xmActions.updateTeam);
		},
		switchLeader: function() {
			xmActions.debug('xmActions.switchLeader');
			$('.leader.ui-draggable').simulate('drag-n-drop', {dropTarget: $('#deck-card2.ui-droppable')});
			setTimeout(xmActions.updateTeam, 2000);
		},
		watchFight: function() {
			xmActions.debug('xmActions.watchFight');
			xmActions.clickAction('img[alt=観戦]', xmActions.toQuestMenu);
		},
		confirmDialog: function(_nextAction) {
			xmActions.debug('xmActions.confirmDialog');
			if ($('#neko-alert-dynamic-ok-button').length > 0) {
				$('#neko-alert-dynamic-ok-button img').click();
				setTimeout(_nextAction, 2000);
			} else {
				setTimeout(function() {
					xmActions.confirmDialog(_nextAction);
				}, 3000);
			}
		},
		confirmAlert: function(_nextAction) {
			xmActions.debug('xmActions.confirmAlert');
			if ($('#neko-alert-dynamic-confirm-button').length > 0) {
				$('#neko-alert-dynamic-confirm-button img').click();
				setTimeout(_nextAction, 1000);
			} else {
				setTimeout(function() {
					xmActions.confirmAlert(_nextAction);
				}, 3000);
			}
		},
		confirmUpgrade: function(_nextAction) {
			xmActions.debug('xmActions.confirmUpgrade');
			xmActions.clickAction('.extend-button img', function() {
				xmActions.confirmDialog(_nextAction);
			});
		},
		confirmBuild: function(_nextAction) {
			xmActions.debug('xmActions.confirmBuild');
			xmActions.clickAction('#build-button img', function() {
				xmActions.confirmDialog(_nextAction);
			});
		}
	};

	chrome.runtime.onMessage.addListener(function (message) {
		switch (message.type) {
			case 'startTrial':
				xmModel.questId = message.questId;
				xmActions.doQuest();
				break;
			case 'unitTest':
				console.log('test.');
				// xmModel.questId = message.questId;
				// xmActions.doQuest();
				// xmActions.confirmAlert();
				break;
			default:
				console.log('No match for ' + message.type);
		}
	});
}
