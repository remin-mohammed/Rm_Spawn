SPAWNNAMES = {}
SPAWNDATA = {}
local cam = nil
local lastloc = {}
local wait = nil

for k, v in pairs(Config.Spawns) do
	table.insert(SPAWNDATA, v)

	table.insert(SPAWNNAMES, { v.name })
end


local function OpenNui(arg)
  SetNuiFocus(arg, arg)
  SendNUIMessage({
    action = 'setVisible',
    data = arg
  })
end

RegisterCommand('sps', function()
  OpenNui(true)
end)

RegisterNUICallback('hide-ui', function(_, cb)
  OpenNui(false)
  cb({})
end)


RegisterNUICallback('getConfig', function(_, cb)
  cb({
    primaryColor = Config.PrimaryColor,
    primaryShade = Config.PrimaryShade,
	buttoncolor = Config.ButtonColor,
	bordercolor = Config.BorderColor

  })
end)

RegisterNUICallback('getLocationsData', function(_, cb)
	cb({
		SPAWNNAMES
	})
  end)
  
  RegisterNUICallback('nuicb', function(data,cb)
			spawn(data)
	end)
	RegisterNUICallback('precb', function(data,cb)
				preview(data)
		end)

  function deepcopy(orig, copies)
    copies = copies or {}
    local orig_type = type(orig)
    local copy
    if orig_type == 'table' then
        if copies[orig] then
            copy = copies[orig]
        else
            copy = {}
            copies[orig] = copy
            for orig_key, orig_value in next, orig, nil do
                copy[deepcopy(orig_key, copies)] = deepcopy(orig_value, copies)
            end
            setmetatable(copy, deepcopy(getmetatable(orig), copies))
        end
    else -- number, string, boolean, etc
        copy = orig
    end
    return copy
end

local defaultSpawns = deepcopy(Config.Spawns)
local spawns = defaultSpawns
  RegisterNetEvent('esx:playerLoaded')
  AddEventHandler('esx:playerLoaded', function()
	  defaultSpawns = deepcopy(Config.Spawns)
	  spawns = defaultSpawns
  end)

exports('Selector', function(coord,options)
	Wait(500)
	if LocalPlayer.state.inshell then return end
	if LocalPlayer.state?.isdead or LocalPlayer.state?.isDead or LocalPlayer.state?.dead or IsPlayerDead(PlayerId()) then return end
	wait = promise.new()
	if coord then
		lastloc = vec4(coord.x,coord.y,coord.z,coord.heading or 0.0)
	else
		local coord = GetEntityCoords(PlayerPedId())
		lastloc = vec4(coord.x,coord.y,coord.z,coord.heading or 0.0)
	end
	local PlayerData = GetEntityCoords(PlayerPedId())       
	SetFocusPosAndVel(125.9797, 6575.4023, 42.0203, 352.2534)                                                         
	CAM = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA",  125.9797, 6575.4023, 42.0203 + 50, -50.00, 0.00, 0.00, 100.00, false, 0)
	SetCamActive(CAM, true)
	RenderScriptCams(true, false, 1, true, true)
	SetNuiFocus(true,true)
	OpenNui(true)	
	if options then
		for k,v in pairs(options) do
			table.insert(spawns,v)
		end
	end
	SendNUIMessage({spawns = spawns})

	return Citizen.Await(wait)
end)
preview = function(name)	
	print(name)
	for i = 1 , #spawns do
		if spawns[i].name == name then
		
		   DoScreenFadeOut(1000)
			Citizen.Wait(2000)
			DoScreenFadeIn(1000)
			SetCamCoord(CAM, spawns[i].camera.x, spawns[i].camera.y, spawns[i].camera.z + 50)
			SetFocusPosAndVel(spawns[i].camera.x, spawns[i].camera.y, spawns[i].camera.z)
		
		end
	end
end

spawn = function(name)

	if LocalPlayer.state?.isdead and lastloc
	or LocalPlayer.state?.isDead and lastloc
	or LocalPlayer.state?.dead and lastloc
	or IsPlayerDead(PlayerId()) and lastloc then 
		SetCamParams(CAM, lastloc.x, lastloc.y, lastloc.z + 800.0, -85.00, 0.00, 0.00, 100.00, 1, 0, 0, 2)
		PlayerSpawn(lastloc)
	end
	if name == 'lastloc' then
		SetCamParams(CAM, lastloc.x, lastloc.y, lastloc.z + 800.0, -85.00, 0.00, 0.00, 100.00, 1, 0, 0, 2)
		PlayerSpawn(lastloc)
	end	
	for i = 1 , #spawns do
		if spawns[i].name == name then
			PlayerSpawn(spawns[i].coord)
			break
		end
	end
	print(name)
	wait:resolve(name)
end

PlayerSpawn = function(coord)
	print("triggeres player spawn")
	SendNUIMessage({close = true})
	SetNuiFocus(false,false)
	local ped = PlayerPedId()
	FreezeEntityPosition(ped, true)
	SetCamParams(CAM, coord.x, coord.y, coord.z+4.2, -85.00, 0.00, 0.00, 50.00, 2000, 0, 0, 2)
	Wait(2000)
	local coord = vec4(coord.x, coord.y, coord.z, coord.w)
	SetFocusPosAndVel(coord.x,coord.y,coord.z)
	RequestCollisionAtCoord(coord.x,coord.y,coord.z)
	SetEntityCoords(ped,coord.x,coord.y,coord.z-0.9)
	SetEntityHeading(ped,coord.w)
	SetFocusEntity(ped)
	SetCamParams(CAM, coord.x+0.5, coord.y-7, coord.z, 0.00, 0.00, 0.00, 20.00, 1000, 0, 0, 2)
	Wait(2000)
	RenderScriptCams(false, true, 3000, true, true)
	while not HasCollisionLoadedAroundEntity(ped) do Wait(1) end
	FreezeEntityPosition(ped, false)
	Wait(3000)
	if DoesCamExist(CAM) then
		SetCamActive(CAM, false)
		print("ola")
	end
end

CloseSelector = function()
	SendNUIMessage({close = true})
	SetNuiFocus(false,false)
	FreezeEntityPosition(ped, false)
	if DoesCamExist(cam) then
		SetCamActive(cam, false)
	end
end

exports('CloseSelector', CloseSelector)




RegisterNetEvent('playerSpawned', function()
	if not Config.Multicharacters then
		exports.rm_spawn:Selector()
	end
end)

