// console.log(location.href);
if (location.href.indexOf("app0.mixi") >= 0 || location.href.indexOf("app.mbga") >= 0 || location.href.indexOf("ld.mygc") >= 0) {
	var xmModel = {
		questId: 1,
		resources: {
			fire: { buildingClass: 'type03', train: ['fire', 'sky', 'earth'] },
			earth: { buildingClass: 'type04', train: ['earth', 'fire', 'wind'] },
			wind: { buildingClass: 'type05', train: ['wind', 'earth', 'water'] },
			water: { buildingClass: 'type06', train: ['water', 'wind', 'sky'] },
			sky: { buildingClass: 'type07', train: ['sky', 'water', 'fire'] }
		},
		train: {
			catPrefix: 'face-card-id',
			level: {
				0: { resources: [8,2,0], time: 10 },
				1: { resources: [13,3,0], time: 15 },
				2: { resources: [23,5,0], time: 20 },
				3: { resources: [38,9,0], time: 25 },
				4: { resources: [60,15,0], time: 50 },
				5: { resources: [89,22,0], time: 80 },
				6: { resources: [125,31,0], time: 120 },
				7: { resources: [168,42,0], time: 180 },
				8: { resources: [218,54,0], time: 300 },
				9: { resources: [275,68,0], time: 480 },
				10: { resources: [342,85,34], time: 720 },
				11: { resources: [419,104,41], time: 1050 },
				12: { resources: [506,126,50], time: 1470 },
				13: { resources: [603,150,60], time:  1980},
				14: { resources: [710,177,71], time: 2580 },
				15: { resources: [827,206,82], time: 3270 },
				16: { resources: [959,239,95], time: 4050 },
				17: { resources: [1106,276,110], time: 4920 },
				18: { resources: [1268,317,126], time: 5880 },
				19: { resources: [1445,361,144], time: 6960 }
			}
		}
	};

	var xmActions = {
		debug: function(_message) {
			console.log(_message);
		},
		doQuest: function() {
			switch (xmModel.questId) {
				case 1:
					xmActions.toMap(function() {
						xmActions.fightEnemy(false);
					});
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
					xmActions.toHome(xmActions.trainCat);
					break;
				case 9:
					xmActions.toMap(function() {
						xmActions.fightEnemy(true);
					});
					break;
				case 10:
					xmActions.toReport(xmActions.watchFight);
					break;
				default:
			}
		},
		clickAction: function(_selector, _nextAction) {
			if ($(_selector).length > 0) {
				$(_selector)[0].click();
				setTimeout(_nextAction, 3000);
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
		},
		fightEnemy: function(_withboss) {
			xmActions.debug('xmActions.fightEnemy');
			xmActions.clickAction('.map_point_e', function() {
				xmActions.confirmFight(_withboss);
			});
		},
		fightBoss: function() {
			xmActions.debug('xmActions.fightBoss');
			xmActions.clickAction('.map_point_e[alt=敵軍]', function() {
				xmActions.confirmFight(false);
			});
		},
		confirmFight: function(_withboss) {
			xmActions.debug('xmActions.confirmFight');
			xmActions.clickAction('.quest-ok-button img:visible', function() {
				xmActions.goFight(_withboss);
			});
		},
		goFight: function(_withboss) {
			xmActions.debug('xmActions.confirmFight');
			xmActions.clickAction('#dialog_g', function() {
				xmActions.confirmGoFight(_withboss);
			});
		},
		confirmGoFight: function(_withboss) {
			xmActions.debug('xmActions.confirmGoFight');
			xmActions.clickAction('#btl-ok-button .neko-alert-button', function() {
				xmActions.waitFight(_withboss);
			});
		},
		waitFight: function(_withboss) {
			xmActions.debug('xmActions.waitFight');
			if ($('#notify_count_main').length > 0) {
				setTimeout(function() {
					xmActions.waitFight(_withboss);
				}, 5000);
			} else {
				setTimeout(function() {
					xmActions.confirmAlert(function() {
						xmActions.confirmAlert(function() {
							if (_withboss) {
								setTimeout(function() {
									xmActions.fightBoss();
								}, 2000);
							} else {
								setTimeout(xmActions.toQuestMenu, 2000);
							}
						});
					});
				}, 1000);
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
			setTimeout(function() {
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
			}, 2000);
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
		},
		startTraining: function() {
			xmActions.debug('xmActions.startTraining');
			// check resources
			var resourceTypes = xmModel.resources[xmModel.train.levelType].train;
			var resources = xmModel.train.level[xmModel.train.startLevel].resources;
			var hasResources = true;
			for (var i = 0; i < resourceTypes.length; i++) {
				if (resources[i] > parseInt($('#element_' + resourceTypes[i]).text())) {
					hasResources = false;
				}
			}
			if (hasResources) {
				$('.' + xmModel.train.catClass).simulate('drag-n-drop', {dropTarget: $('img.' + xmModel.resources[xmModel.train.levelType].buildingClass)});
				setTimeout(function() {
					xmActions.confirmDialog(function() {
						var timer = xmModel.train.level[xmModel.train.startLevel].time;
						console.log('timer: ' + timer);
						setTimeout(xmActions.waitTraining, timer * 1000);
					});
				}, 2000);
			} else {
				console.log('not enough resources.');
			}
		},
		waitTraining: function() {
			xmActions.debug('xmActions.waitTraining');
			if ($.trim($("#doing").text()).indexOf($('.' + xmModel.train.catClass).prop('alt')) > -1) {
				setTimeout(xmActions.waitTraining, 10000);
			} else {
				xmModel.train.startLevel = xmModel.train.startLevel + 1;
				if (xmModel.train.startLevel < xmModel.train.endLevel) {
					xmActions.startTraining();
				} else {
					console.log('training finish.');
				}
			}
		}
	};

	chrome.runtime.onMessage.addListener(function (message) {
		switch (message.type) {
			case 'startTrial':
				xmModel.questId = message.questId;
				xmActions.doQuest();
				break;
			case 'startTraining':
				xmModel.train.catClass = xmModel.train.catPrefix + message.catId;
				xmModel.train.startLevel = message.startLevel;
				xmModel.train.endLevel = message.endLevel;
				xmModel.train.levelType = message.levelType;
				xmActions.startTraining();
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
